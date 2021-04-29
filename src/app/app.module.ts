import { SharedModule } from './shared/shared.module';
import { ExcelService } from './Services/excel.service';
import { RegisterComponent } from './Components/account/register/register.component';
import { ErrorInterceptor } from './Helpers/error.interceptor';
import { JwtInterceptor } from './Helpers/jwt.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './Components/alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './Services/account.service';
import { HomeComponent } from './Components/home/home.component';
import { BookService } from './Services/book.service';
import { BarchartComponent } from './Components/chart/barchart/barchart.component';
import { DeactiveGuard } from './Helpers/deactive.guard';
import { CategoriesModule } from './Components/category/categories.module';
import { UsersModule } from './Components/user/users.module';
import { BooksModule } from './Components/book/books.module';
import { LoginComponent } from './Components/account/login/login.component';
import { NavComponent } from './Components/nav/nav.component';
import { ExportUserComponent } from './shared/export-user/export-user.component';
import { TestComponent } from './Components/test/test.component';
import { ListUserComponent } from './Components/user/list-user/list-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    BarchartComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    TestComponent
  ],
  exports:[
    AlertComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    CategoriesModule,
    UsersModule,
    BooksModule,
    SharedModule,
  ],
  providers: [
     AccountService,
     BookService,
     DeactiveGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
