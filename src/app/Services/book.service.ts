import { Book } from './../Models/book';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  readonly APIUrl = 'https://localhost:44373/odata';
  public book: Observable<Book>;

  constructor(private http: HttpClient) { }

  getBookList():Observable<Book[]>{
    return this.http.get<any>(this.APIUrl+'/Books?$expand=Category');
  }
  getBookById(id: string) {
    return this.http.get<Book>(this.APIUrl + '/Books?Id=' + id);
  }
  addBook(book:Book){
    return this.http.post(this.APIUrl+'/Books/PostBook', book);
  }
  updateBook(id, book:Book){    
    return this.http.put(this.APIUrl+'/Books/UpdateBook?Id=' + id +'&BookName='+book.BookName+'&Author='+book.Author+'&Price='+book.Price+'&CategoryId='+book.CategoryId,book);
  }
  deleteBook(id: string){
    return this.http.delete(this.APIUrl+'/Books/DeleteBook?Id=' + id);
  }
}
