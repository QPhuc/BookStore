using System;
using System.Collections.Generic;

#nullable disable

namespace BookStore.Entity
{
    public partial class Book
    {
        public int Id { get; set; }
        public string BookName { get; set; }
        public string Author { get; set; }
        public string Price { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}
