import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { LayoutCategoryComponent } from './layout-category/layout-category.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CategoriesRoutingModule
    ],
    declarations: [

    
        LayoutCategoryComponent,
        AddEditCategoryComponent,
        ListCategoryComponent
  ]
})
export class CategoriesModule { }