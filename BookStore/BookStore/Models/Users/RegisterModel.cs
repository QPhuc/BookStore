using BookStore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models.Users
{
  public class RegisterModel
  {

    [Required]
    public string Fname { get; set; }
    [Required]
    public string Lname { get; set; }
    [Required]
    public DateTime? Birthday { get; set; }
    [Required]
    public string Phone { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }

  }
}
