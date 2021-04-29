import { SharedModule } from './../../shared/shared.module';
import { ExportUserComponent } from './../../shared/export-user/export-user.component';
import { LayoutUserComponent } from './layout-user/layout-user.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { AlertComponent } from '../alert/alert.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        SharedModule
    ],
    declarations: [
        ListUserComponent,
        AddEditUserComponent,
        LayoutUserComponent,
    ]
})
export class UsersModule { }