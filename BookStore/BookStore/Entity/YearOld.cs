using System;
using System.Collections.Generic;

#nullable disable

namespace BookStore.Entity
{
    public partial class YearOld
    {
        public int Id { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public DateTime? Birthday { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int? YearOld1 { get; set; }
    }
}
