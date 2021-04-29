using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStore.Entity;

namespace Categoriestore.Controllers
{
  [ODataRoutePrefix("Categories")]
  public class Categories : ODataController
  {

    private bookStoreDBContext _db;

    public Categories(bookStoreDBContext context)
    {
      _db = context;
    }

    [HttpGet("odata/Categories")]
    [EnableQuery(PageSize = 20, AllowedQueryOptions = AllowedQueryOptions.All)]
    public IActionResult Get()
    {
      return Ok(_db.Categories.AsQueryable());
    }

    [HttpGet("odata/Categories({id})")]
    [EnableQuery(PageSize = 20, AllowedQueryOptions = AllowedQueryOptions.All)]
    public IActionResult Get([FromODataUri] int id)
    {
      return Ok(_db.Categories.Find(id));
    }

    [ODataRoute("PostCategory")]
    [HttpPost]
    public IActionResult PostCategory([FromBody] Category Category)
    {
      _db.Categories.Add(Category);
      _db.SaveChanges();
      return Created(Category);
    }

    [ODataRoute("DeleteCategory")]
    [HttpDelete]
    public IActionResult DeleteCategory([FromODataUri] int Id)
    {
      var Category = _db.Categories.Find(Id);
      if (Category == null)
      {
        return NotFound();
      }
      else
      {
        var books = _db.Books.Where(book => book.CategoryId == Id).ToList();
        _db.Books.RemoveRange(books);
        _db.SaveChanges();
        _db.Categories.Remove(Category);
        _db.SaveChanges();
        return Ok(Category);
      }
    }

    [ODataRoute("UpdateCategory")]
    [HttpPut]
    public IActionResult UpdateCategory(Category Category, [FromODataUri] int Id)
    {
      if (Id != Category.Id)
      {
        return BadRequest();
      }
      _db.Entry(Category).State = EntityState.Modified;
      _db.SaveChanges();
      return Ok(Category);
    }

    private bool CategoryExists(int id)
    {
      using (var _context = new bookStoreDBContext())
      {
        return _context.Categories.Any(e => e.Id == id);
      }
    }
  }
}
