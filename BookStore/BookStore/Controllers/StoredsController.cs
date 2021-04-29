using BookStore.Entity;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Controllers
{
  public class StoredsController : ControllerBase
  {
    private bookStoreDBContext _db;

    public StoredsController(bookStoreDBContext context)
    {
      _db = context;
    }

    [HttpGet("Storeds/{id}")]
    public IActionResult GetStoreds(int id)
    {
      //var book_cate = _db.Database.ExecuteSqlRaw("exec storeBook {0}", id);
      var book_cate = _db.Books.FromSqlRaw("EXEC storedBook {0}", id).ToList();
      return Ok(book_cate);
    }
  }
}
