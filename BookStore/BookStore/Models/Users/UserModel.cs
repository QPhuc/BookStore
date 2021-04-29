using BookStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models.Users
{
  public class UserModel
  {
    public int Id { get; set; }
    public string Fname { get; set; }
    public string Lname { get; set; }
    public DateTime? Birthday { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }

  }
}
