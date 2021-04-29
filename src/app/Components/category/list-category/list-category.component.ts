import { ActivatedRoute } from '@angular/router';
import { AlertService } from './../../../Services/alert.service';
import { Category } from './../../../Models/category';
import { CategoryService } from './../../../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
})
export class ListCategoryComponent implements OnInit {
  categories: Category[] = [];
  deleteCate: Category;

  constructor(
    private categoryService: CategoryService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categories = this.route.snapshot.data.categories['value'];
  }

  deleteCategory(id: string) {
    if(confirm("Are you want delete?")){
      this.categoryService
        .deleteCategory(id)
        .subscribe((x) => {
          this.deleteCate = x as Category;
          this.setCategory();
          this.alertService.success('Category Delete Successfully');
        });
  }
    else
      return false;
  }

  setCategory() {
    this.categoryService
      .getCategoryList()
      .subscribe(
        (category) => (this.categories = category['value'] as Category[])
      );
  }
}
