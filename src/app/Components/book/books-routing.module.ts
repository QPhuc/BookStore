import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookResolver } from "@app/Resolvers/book.resolver";
import { AddEditBookComponent } from "./add-edit-book/add-edit-book.component";
import { LayoutBookComponent } from "./layout-book/layout-book.component";
import { ListBookComponent } from "./list-book/list-book.component";


const routes: Routes = [
    {
        path: '', component: LayoutBookComponent,
        resolve:{
            books: BookResolver
        },
        children: [
            { path: '', component: ListBookComponent },
            { path: 'add', component: AddEditBookComponent },
            { path: 'edit/:id', component: AddEditBookComponent }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule { }