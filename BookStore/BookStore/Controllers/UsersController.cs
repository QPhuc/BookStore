using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using BookStore.Helpers;
using Microsoft.Extensions.Options;
using BookStore.Models.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using BookStore.Models;
using BookStore.Entity;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using System.Linq;

namespace BookStore.Controllers
{
  [Authorize]
  [ODataRoutePrefix("Users")]
  public class UsersController : ODataController
  {

    private IMapper _mapper;
    private bookStoreDBContext _db;

    public UsersController(IMapper mapper, bookStoreDBContext context)
    {
      _mapper = mapper;
      _db = context;
    }

    [AllowAnonymous]
    [HttpGet("odata/Users")]
    [EnableQuery(PageSize = 20, AllowedQueryOptions = AllowedQueryOptions.All)]
    public IActionResult GetAll()
    {
      var users = _db.Users.AsQueryable();
      return Ok(users);
    }

    [AllowAnonymous]
    [HttpGet("odata/Users({id})")]
    [EnableQuery(PageSize = 20, AllowedQueryOptions = AllowedQueryOptions.All)]
    public IActionResult GetById([FromODataUri] int id)
    {
      var user = _db.Users.Find(id);
      return Ok(user);
    }

    [AllowAnonymous]
    [ODataRoute("Authenticate")]
    [HttpPost]
    public IActionResult Authenticate([FromBody] AuthenticateModel entity)
    {
      var user = Authenticate(entity.Username, entity.Password);

      if (user == null)
        return BadRequest(new { message = "Username or password is incorrect" });

      var tokenHandler = new JwtSecurityTokenHandler();
      //var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
          new Claim(ClaimTypes.Name, user.Id.ToString())
        }),
        Expires = DateTime.UtcNow.AddDays(3),
        //SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      var tokenString = tokenHandler.WriteToken(token);

      // return basic user info and authentication token
      return Ok(new
      {
        Id = user.Id,
        Username = user.Username,
        Fname = user.Fname,
        Lname = user.Lname,
        Birthday = user.Birthday,
        Email = user.Email,
        Phone = user.Phone,
        Token = tokenString
      });
    }

    [AllowAnonymous]
    [ODataRoute("Register")]
    [HttpPost]
    public IActionResult Register([FromBody] RegisterModel entity)
    {
      // map model to entity
      var user = _mapper.Map<User>(entity);

      try
      {
        // create user
        var result = Create(user, entity.Password);
        return Ok(result);
      }
      catch (AppException ex)
      {
        // return error message if there was an exception
        return BadRequest(new { message = ex.Message });
      }
    }

    [AllowAnonymous]
    [ODataRoute("UpdateUser")]
    [HttpPut]
    public IActionResult UpdateUser([FromODataUri] int id, [FromBody] UpdateModel entity)
    {
      // map model to entity and set id
      var user = _mapper.Map<User>(entity);
      user.Id = id;

      try
      {
        // update user 
        Update(user, entity.Password);
        return Ok(user);
      }
      catch (AppException ex)
      {
        // return error message if there was an exception
        return BadRequest(new { message = ex.Message });
      }
    }

    [AllowAnonymous]
    [ODataRoute("DeleteUser")]
    [HttpDelete]
    public IActionResult DeleteUser([FromODataUri] int id)
    {
      var user = _db.Users.Find(id);
      if (user != null)
      {
        _db.Users.Remove(user);
        _db.SaveChanges();
      }
      //_userService.Delete(id);
      return Ok();
    }

    public User Authenticate(string username, string password)
    {
      if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        return null;

      var user = _db.Users.SingleOrDefault(x => x.Username == username);

      // check if username exists
      if (user == null)
        return null;

      // check if password is correct
      if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        return null;

      // authentication successful
      return user;
    }

    public User Create(User user, string password)
    {
      // validation
      if (string.IsNullOrWhiteSpace(password))
        throw new AppException("Password is required");

      if (_db.Users.Any(x => x.Username == user.Username))
        throw new AppException("Username \"" + user.Username + "\" is already taken");

      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(password, out passwordHash, out passwordSalt);

      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;

      _db.Users.Add(user);
      _db.SaveChanges();

      return user;
    }

    public void Update(User userParam, string password = null)
    {
      var user = _db.Users.Find(userParam.Id);

      if (user == null)
        throw new AppException("User not found");

      // update username if it has changed
      if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
      {
        // throw error if the new username is already taken
        if (_db.Users.Any(x => x.Username == userParam.Username))
          throw new AppException("Username " + userParam.Username + " is already taken");

        user.Username = userParam.Username;
      }

      // update user properties if provided
      if (!string.IsNullOrWhiteSpace(userParam.Fname))
        user.Fname = userParam.Fname;

      if (!string.IsNullOrWhiteSpace(userParam.Lname))
        user.Lname = userParam.Lname;

      user.Birthday = userParam.Birthday;

      if (!string.IsNullOrWhiteSpace(userParam.Phone))
        user.Phone = userParam.Phone;

      if (!string.IsNullOrWhiteSpace(userParam.Email))
        user.Email = userParam.Email;

      // update password if provided
      if (!string.IsNullOrWhiteSpace(password))
      {
        byte[] passwordHash, passwordSalt;
        CreatePasswordHash(password, out passwordHash, out passwordSalt);

        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
      }

      _db.Users.Update(user);
      _db.SaveChanges();
    }


    private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
      if (password == null) throw new ArgumentNullException("password");
      if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
      if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
      if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

      using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
      {
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; i++)
        {
          if (computedHash[i] != storedHash[i]) return false;
        }
      }

      return true;
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      if (password == null) throw new ArgumentNullException("password");
      if (string.IsNullOrWhiteSpace(password))
        throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }
  }
}
