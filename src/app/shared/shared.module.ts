import { ExportUserComponent } from './export-user/export-user.component';
import { ExcelService } from './../Services/excel.service';
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ExportUserComponent
    ],
    providers: [
        ExcelService
    ],
    exports: [
        ExportUserComponent
    ],
})
export class SharedModule {
}
