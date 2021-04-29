using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing;
using BookStore.Entity;

namespace BookStore.Controllers
{
  [ODataRoutePrefix("Books")]
  public class BooksController : ODataController
  {

    private bookStoreDBContext _db;

    public BooksController(bookStoreDBContext context)
    {
      _db = context;
    }

    [HttpGet("odata/Books")]
    [EnableQuery(PageSize = 20, AllowedQueryOptions = AllowedQueryOptions.All)]
    public IActionResult Get()
    {
      return Ok(_db.Books.AsQueryable());
    }

    [HttpGet("odata/Books({id})")]
    [EnableQuery(PageSize = 20, AllowedQueryOptions = AllowedQueryOptions.All)]
    public IActionResult Get([FromODataUri] int id)
    {
      return Ok(_db.Books.Find(id));
    }

    [ODataRoute("PostBook")]
    [HttpPost]
    public IActionResult PostBook([FromBody] Book book)
    {
      _db.Books.Add(book);
      _db.SaveChanges();
      return Created(book);
    }

    //[ODataRoute("DeleteBook({id})")]
    [ODataRoute("DeleteBook")]
    [HttpDelete]
    public IActionResult DeleteBook([FromODataUri] int Id)
    {
      var book = _db.Books.Find(Id);
      if (book == null)
      {
        return NotFound();
      }
      _db.Books.Remove(book);
      _db.SaveChanges();
      return Ok(book);
    }

    [ODataRoute("UpdateBook")]
    [HttpPut]
    public IActionResult UpdateBook(Book book, [FromODataUri] int Id)
    {
      if (Id != book.Id)
      {
        return BadRequest();
      }
      _db.Entry(book).State = EntityState.Modified;
      _db.SaveChanges();
      return Ok(book);
    }

    private bool BookExists(int id)
    {
      using (var _context = new bookStoreDBContext())
      {
        return _context.Books.Any(e => e.Id == id);
      }
    }
  }
}
