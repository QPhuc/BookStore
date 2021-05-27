using BookStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models.Users
{
  public class UpdateModel
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime? Birthday { get; set; }
    public int? Phone { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }

  }
}
