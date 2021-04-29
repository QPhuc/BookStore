import { NavComponent } from './Components/nav/nav.component';
import { RegisterComponent } from './Components/account/register/register.component';
import { BarchartComponent } from './Components/chart/barchart/barchart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuard } from './Helpers/auth.guard';
import { DeactiveGuard } from './Helpers/deactive.guard';
import { LoginComponent } from './Components/account/login/login.component';

const usersModule = () => import('./Components/user/users.module').then(x => x.UsersModule);
const booksModule = () => import('./Components/book/books.module').then(x => x.BooksModule);
const categoriesModule = () => import('./Components/category/categories.module').then(x => x.CategoriesModule);


const routes: Routes = [
  { path: '',  component:NavComponent,canActivate: [AuthGuard],canDeactivate:[DeactiveGuard],
  children:[
      { path: '', component: HomeComponent},
      { path: 'barchart', component: BarchartComponent},
      { path: 'users', loadChildren: usersModule},
      { path: 'books', loadChildren: booksModule},
      { path: 'categories', loadChildren: categoriesModule},
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
