import { User } from './../../Models/user';
import { IExportUserList } from './../../Models/iexportuserlist';
import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from '@app/Services/excel.service';

@Component({
  selector: 'app-export-user',
  templateUrl: './export-user.component.html'
})
export class ExportUserComponent implements OnInit {
  @Input() userId: number;
  @Input() users: User[] = [];
  dataExport: Array<IExportUserList> = null;

  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
    console.log(this.users);
  }
  
  exportExcelFile(){
    this.dataExport = this.getUserDataExport();
    this.excelService.exportAsExcelFile(this.dataExport, `User#${this.userId}_user_list`);
  }

  getUserDataExport(): Array<IExportUserList>{
    const dataLines: Array<IExportUserList> = [];
    console.log(this.users);
    
    this.users.forEach(x => {
      console.log(this.getDataForEachLine(dataLines,x['user']));
      
      this.getDataForEachLine(dataLines,x['user']);
    })
    return dataLines;
  }

  getDataForEachLine(
    dataLines: Array<IExportUserList>,
    userList: Array<User>,
    ):void {
      userList.forEach(x => {
        const exportUserList: IExportUserList = {
          'First Name': x.Fname,
          'Last Name': x.Lname,
          'Birthday': x.Birthday,
          'Year Old': x.YearOld1,
          'Email': x.Email
        };

        dataLines.push(exportUserList); 
      })
  }
}
