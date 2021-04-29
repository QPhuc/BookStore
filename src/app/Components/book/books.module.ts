import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AddEditBookComponent } from "./add-edit-book/add-edit-book.component";
import { BooksRoutingModule } from "./books-routing.module";
import { LayoutBookComponent } from "./layout-book/layout-book.component";
import { ListBookComponent } from "./list-book/list-book.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BooksRoutingModule
    ],
    declarations: [
        ListBookComponent,
        AddEditBookComponent,
        LayoutBookComponent
    ]
})
export class BooksModule { }