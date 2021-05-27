using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;


namespace BookStore.Entity
{
    public partial class bookStoreDBContext : DbContext
    {
        public bookStoreDBContext()
        {
        }

        public bookStoreDBContext(DbContextOptions<bookStoreDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<YearOld> YearOlds { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.\\TQUANGPHUC;Database=bookStoreDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Book>(entity =>
            {
                entity.ToTable("Book");

                entity.Property(e => e.Author)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BookName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Price)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Books)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__Book__CategoryId__267ABA7A");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Birthday).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Fname)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("FName");

                entity.Property(e => e.Lname)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("LName");

                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<YearOld>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Year_old");

                entity.Property(e => e.Birthday).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Fname)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("FName");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Lname)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("LName");

                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.YearOld1).HasColumnName("Year_old");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
