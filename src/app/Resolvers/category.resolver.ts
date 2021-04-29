import { CategoryService } from './../Services/category.service';
import { Category } from './../Models/category';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryResolver implements Resolve<Category[]> {
  constructor(private categoryService: CategoryService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Category[]> {
     return this.categoryService.getCategoryList();
  }
}
