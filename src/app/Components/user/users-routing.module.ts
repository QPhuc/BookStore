import { UserResolver } from './../../Resolvers/user.resolver';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LayoutUserComponent } from './layout-user/layout-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    {
        path: '', component: LayoutUserComponent,resolve: {
            users:UserResolver
        },
        children: [
            { path: '', component: ListUserComponent },
            { path: 'add', component: AddEditUserComponent },
            { path: 'edit/:id', component: AddEditUserComponent }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }