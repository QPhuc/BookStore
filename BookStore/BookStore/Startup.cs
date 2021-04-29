using BookStore.Controllers;
using BookStore.Helpers;
using BookStore.Entity;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OData.Edm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore
{
  public class Startup
  {
    private readonly IWebHostEnvironment _env;
    private readonly IConfiguration _configuration;
    public Startup(IWebHostEnvironment env, IConfiguration configuration)
    {
      _env = env;
      _configuration = configuration;
    }


    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<bookStoreDBContext>();
      services.AddOData();
      services.AddODataQueryFilter();

      //CORS
      services.AddCors(c =>
      {
        c.AddPolicy("AllowOrigin ", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
      });
      services
              .AddMvc()
              .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
              .AddJsonOptions(x => { });

      services.AddControllers();
      services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

      // configure strongly typed settings objects
      var appSettingsSection = _configuration.GetSection("AppSettings");
      services.Configure<AppSettings>(appSettingsSection);

      // configure jwt authentication
      var appSettings = appSettingsSection.Get<AppSettings>();
      //var key = Encoding.ASCII.GetBytes(appSettings.Secret);
      services.AddAuthentication(x =>
      {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(x =>
      {
        x.Events = new JwtBearerEvents
        {
          OnTokenValidated = context =>
          {
            var userService = context.HttpContext.RequestServices.GetRequiredService<UsersController>();
            var userId = int.Parse(context.Principal.Identity.Name);
            var user = userService.GetById(userId);
            if (user == null)
            {
              // return unauthorized if user no longer exists
              context.Fail("Unauthorized");
            }
            return Task.CompletedTask;
          }
        };
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          //IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false
        };
      });

      // configure DI for application services
      services.AddScoped<UsersController>();

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      // global cors policy
      app.UseCors(x => x
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());

      app.UseCors("CorsPolicy");


      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        endpoints.MapODataRoute("odata", "odata", GetEdmModel(app.ApplicationServices));
      });
    }

    private IEdmModel GetEdmModel(IServiceProvider service)
    {
      ODataModelBuilder builder = new ODataConventionModelBuilder(service);
      builder.EntitySet<Book>("Books")
                                      .EntityType
                                      .Filter()
                                      .Count()
                                      .Expand()
                                      .OrderBy()
                                      .Page()
                                      .Select();

      builder.EntitySet<User>("Users")
                                .EntityType
                                .Filter()
                                .Count()
                                .Expand()
                                .OrderBy()
                                .Page()
                                .Select();

      builder.EntitySet<Category>("Categories")
                          .EntityType
                          .Filter()
                          .Count()
                          .Expand()
                          .OrderBy()
                          .Page()
                          .Select();

      builder.EntitySet<YearOld>("YearOlds")
                    .EntityType
                    .Filter()
                    .Count()
                    .Expand()
                    .OrderBy()
                    .Page()
                    .Select();

      //Books
      EntitySetConfiguration<Book> books = builder.EntitySet<Book>("Books");
      FunctionConfiguration postBook = books.EntityType.Collection.Function("PostBook");
      postBook.ReturnsCollectionFromEntitySet<Book>("Books");
      FunctionConfiguration deleteBook = books.EntityType.Collection.Function("DeleteBook");
      deleteBook.ReturnsCollectionFromEntitySet<Book>("Books");
      FunctionConfiguration updateBook = books.EntityType.Collection.Function("UpdateBook");
      updateBook.ReturnsCollectionFromEntitySet<Book>("Books");


      //Users
      EntitySetConfiguration<User> users = builder.EntitySet<User>("Users");
      FunctionConfiguration register = users.EntityType.Collection.Function("Register");
      register.ReturnsCollectionFromEntitySet<User>("Users");
      FunctionConfiguration authenticate = users.EntityType.Collection.Function("Authenticate");
      authenticate.ReturnsCollectionFromEntitySet<User>("Users");
      FunctionConfiguration deleteUser = users.EntityType.Collection.Function("DeleteUser");
      deleteUser.ReturnsCollectionFromEntitySet<User>("Users");
      FunctionConfiguration updateUser = users.EntityType.Collection.Function("UpdateUser");
      updateUser.ReturnsCollectionFromEntitySet<User>("Users");

      //Categories
      EntitySetConfiguration<Category> categories = builder.EntitySet<Category>("Categories");
      FunctionConfiguration postCategory = categories.EntityType.Collection.Function("PostCategory");
      postCategory.ReturnsCollectionFromEntitySet<Category>("Categories");
      FunctionConfiguration deleteCategory = categories.EntityType.Collection.Function("DeleteCategory");
      deleteCategory.ReturnsCollectionFromEntitySet<Category>("Categories");
      FunctionConfiguration updateCategory = categories.EntityType.Collection.Function("UpdateCategory");
      updateCategory.ReturnsCollectionFromEntitySet<Category>("Categories");

      //Categories
      EntitySetConfiguration<YearOld> yearOlds = builder.EntitySet<YearOld>("YearOlds");

      return builder.GetEdmModel();

    }
  }
}
