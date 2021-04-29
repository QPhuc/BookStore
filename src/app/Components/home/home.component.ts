import { Component, OnInit } from '@angular/core';
import { User } from '@app/Models/user';
import { AccountService } from '@app/Services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  user: User;
  
  constructor(private accountService: AccountService) { 
      this.accountService.user.subscribe(u => (this.user = u));
  }
}
