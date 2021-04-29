import { Book } from '@app/Models/book';
import { CategoryService } from './../../../Services/category.service';
import { BookService } from './../../../Services/book.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/Services/account.service';
import { AlertService } from '@app/Services/alert.service';
import { first } from 'rxjs/operators';
import { Category } from '@app/Models/category';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
})
export class AddEditBookComponent implements OnInit {
  form: FormGroup;
  id: string;
  books: Book;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  category: Category;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private alertService: AlertService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.categoryService
      .getCategoryList()
      .pipe(first())
      .subscribe((category) => (this.category = category['value']));

    this.form = this.formBuilder.group({
      BookName: ['', Validators.required],
      Author: ['', Validators.required],
      Price: ['', [Validators.required, Validators.pattern('(^\\+)?[0-9()-]*')]],
      CategoryId: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.bookService
        .getBookById(this.id)
        .pipe(first())
        .subscribe(
          (x: { BookName: any; Author: any; Price: any; CategoryId: any }) => {
            this.f.BookName.setValue(x.BookName);
            this.f.Author.setValue(x.Author);
            this.f.Price.setValue(x.Price);
            this.f.CategoryId.setValue(x.CategoryId);
          }
        );
    }
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createBook();
    } else {
      this.updateBook();
    }
  }

  private createBook() {
    this.bookService
      .addBook(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Book added successfully', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  private updateBook() {
    this.books = this.form.value;
    console.log(this.books);

    this.bookService
      .updateBook(this.id, this.books)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Update successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['..', { relativeTo: this.route }]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
