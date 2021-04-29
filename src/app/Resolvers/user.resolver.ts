import { Observable } from 'rxjs';
import { AccountService } from './../Services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '@app/Models/user';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User[]>{
    constructor(private accountService: AccountService){
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<User[]> {
        return this.accountService.getAll();
    }
}