import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from '@app/Services/account.service';

export interface CanComponentDeactivate {
  confirm(): boolean;
}

@Injectable()
export class DeactiveGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private router: Router, private accountService: AccountService) {}
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): boolean {
    if (this.accountService.isLogout) {
      if (confirm('You are want logout ?')) {
        localStorage.removeItem('user');
        this.accountService.userSubject.next(null);
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
