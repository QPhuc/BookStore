import { Category } from './../Models/category';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly APIUrl = 'https://localhost:44373/odata';
  public category: Observable<Category>;
  
  constructor(private http: HttpClient) { }

  getCategoryList():Observable<Category[]>{
    return this.http.get<any>(this.APIUrl+'/Categories');
  }
  getCategoryById(id: string) {
    return this.http.get<Category>(this.APIUrl + '/Categories?Id=' + id);
  }
  addCategory(Category:Category){
    return this.http.post(this.APIUrl+'/Categories/PostCategory', Category);
  }
  updateCategory(id, category:Category){
    return this.http.put(this.APIUrl+'/Categories/UpdateCategory?Id=' + id+'&CategoryName='+category.CategoryName, category);
  }
  deleteCategory(id: string){
    return this.http.delete(this.APIUrl+'/Categories/DeleteCategory?Id=' + id);
  }
}
