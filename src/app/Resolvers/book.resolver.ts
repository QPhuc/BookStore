import { BookService } from './../Services/book.service';
import { Book } from './../Models/book';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book[]> {
  constructor(private bookService: BookService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Book[]> {
     return this.bookService.getBookList();

  }
}
