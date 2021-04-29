import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryResolver } from "@app/Resolvers/category.resolver";
import { AddEditCategoryComponent } from "./add-edit-category/add-edit-category.component";
import { LayoutCategoryComponent } from "./layout-category/layout-category.component";
import { ListCategoryComponent } from "./list-category/list-category.component";

const routes: Routes = [
    {
        path: '', component: LayoutCategoryComponent,resolve: {
            categories:CategoryResolver
        },
        children: [
            { path: '', component: ListCategoryComponent },
            { path: 'add', component: AddEditCategoryComponent },
            { path: 'edit/:id', component: AddEditCategoryComponent }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }