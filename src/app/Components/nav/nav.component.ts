import { Component, OnInit } from '@angular/core';
import { User } from '@app/Models/user';
import { AccountService } from '@app/Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {
  user: User;
  
  constructor(private accountService: AccountService) { 
      this.user = this.accountService.userValue;
      this.accountService.user.subscribe((x) => (this.user = x));
  }
  logout () {
    this.accountService.logout();
  }
}
