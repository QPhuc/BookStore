import { ActivatedRoute } from '@angular/router';
import { BookService } from './../../../Services/book.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { Book } from '@app/Models/book';
import { AlertService } from '@app/Services/alert.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
})
export class ListBookComponent implements OnInit {
  books: Book[] = [];
  delete: Book;

  constructor(
    private bookService: BookService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.books = this.route.snapshot.data.books['value'];
  }

  deleteBook(id: string) {
    if (confirm('Are you want delete?')) {
      this.bookService
        .deleteBook(id)
        .subscribe(x => {
          this.delete = x as Book;
          this.setBooks();
          this.alertService.success('Book delete Successfully');
        });
    } else return false;
  }
  setBooks() {
    this.bookService
      .getBookList()
      .subscribe(books => (this.books = books['value'] as Book[]));
      
  }
}
