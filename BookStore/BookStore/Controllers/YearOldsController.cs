using BookStore.Entity;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YearOldStore.Controllers
{
  [ODataRoutePrefix("YearOlds")]
  public class YearOldsController : ODataController
  {

    private bookStoreDBContext _db;

    public YearOldsController(bookStoreDBContext context)
    {
      _db = context;
    }

    [HttpGet("odata/YearOlds")]
    [EnableQuery(PageSize = 20, AllowedQueryOptions = AllowedQueryOptions.All)]
    public IActionResult Get()
    {
      return Ok(_db.YearOlds.AsQueryable());
    }
  
    [HttpGet("odata/YearOlds({id})")]
    [EnableQuery(PageSize = 20, AllowedQueryOptions = AllowedQueryOptions.All)]
    public IActionResult Get([FromODataUri] int id)
    {
      return Ok(_db.YearOlds.Find(id));
    }
  }
}
