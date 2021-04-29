import { User } from './../../../Models/user';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { IClaim } from '@app/Models/iclaim';
import { AccountService } from '@app/Services/account.service';
import { TempService } from '@app/Services/temp.service';
import { Observable, pipe, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
})
export class ListUserComponent implements OnInit {
  // claims: Array<IClaim>;
  users: User[] = [];
  filterUSers:User[] = [];
  delete: User;
  filterText: string;
  searching: boolean;
  reload: boolean;
  private textSearchStream: Subject<string>;

  constructor(private accountService: AccountService, private route: ActivatedRoute, private tempService: TempService, private changeDetectorRef: ChangeDetectorRef) {
    this.filterText = '';
    this.textSearchStream = new Subject<string>();
  }

  ngOnInit() {
    this.users = this.route.snapshot.data.users['value'];
    this.filterText = this.tempService.searchText;
    this.accountService.getAll().subscribe(x => {
      if (x != null && x != undefined) {
        this.filterUSers = x;
         this.users = x;
        
        this.searching = false;
        // Setup Text search for factories
        const debouncetime = pipe(debounceTime(1000));
        this.textSearchStream
          .pipe(debouncetime)
          // .distinctUntilChanged()
          .subscribe(
            (data: Array<User>) => {
              this.filterUSers = data;
              // this.filterUSers = this.filterUSers.sort((x, y) => {
              //   return x.WW > y.WW ? 1 : -1;
              // });
              this.reload = true;
              this.changeDetectorRef.detectChanges();
              this.reload = false;
              this.changeDetectorRef.detectChanges();
            },
            (err: Response) => {
              // Log error
              console.log(err);
              const body = err.json();
              // Display message
              // this.alertService.addAlert({ Type: 'danger', Dismissible: true, Message: 'An error occurred on filter of builds.' } as IAlert);
            });
        if (this.filterText != '' && this.filterText != null && this.filterText != undefined) {
          this.textSearch(this.filterText);
        }
      }
    });
  }
/**
* Adds new search text to the search subject
* @param text - search text
*/
textSearch(text: string) {
  this.tempService.searchText = text;
  this.textSearchStream.next(text);
}

  deleteUser(id: string) {
    if(confirm("Are you want delete?")){
      this.accountService
        .delete(id)
        .pipe(first())
        .subscribe(x => {
          this.delete = x as User;
          this.setUser();
        });
    }
    else
      return false;
  }
  setUser() {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe(users => this.users = users['value'] as User[]);
  }
}
