import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  readonly APIUrl = 'https://localhost:44373/odata';
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  isLogout: boolean = false;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password) {
    this.isLogout = false;
    return this.http
      .post<User>(this.APIUrl + '/users/authenticate', { username, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.isLogout = true;
    // localStorage.removeItem('user');
    // this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(this.APIUrl + '/users/register', user);
  }

  getAll() {
    return this.http.get<User[]>(this.APIUrl + '/yearolds');
  }

  getById(id: string) {
    return this.http.get<User>(this.APIUrl + '/users(' + id + ')');
  }

  update(id, params) {
    return this.http
      .put(this.APIUrl + '/users/UpdateUser?Id=' + id, params)
      .pipe(
        map((x) => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
            // update local storage
            const user = { ...this.userValue, ...params };
            localStorage.setItem('user', JSON.stringify(user));

            // publish updated user to subscribers
            this.userSubject.next(user);
          }
          return x;
        })
      );
  }
  delete(id: string) {
    return this.http.delete(this.APIUrl + '/users/DeleteUser?Id=' + id).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      })
    );
  }
}
