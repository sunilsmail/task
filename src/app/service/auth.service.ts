import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private users: User[] = [
    {
      userName: 'admin',
      password: 'admin',
      role: 'admin',
    },
    {
      userName: 'user',
      password: 'user',
      role: 'user',
    },
  ];

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const LoggedInUser = this.users.filter((user) => {
      return user.userName === username && user.password === password;
    });

    if (LoggedInUser && LoggedInUser.length > 0) {
      localStorage.setItem('currentUser', JSON.stringify(LoggedInUser[0]));
      this.currentUserSubject.next(LoggedInUser[0]);
      return of(LoggedInUser[0]);
    } else {
      return of(null);
    }
    // return this.http
    //   .post<any>(`/users/authenticate`, { username, password })
    //   .pipe(
    //     map((user) => {
    //       // login successful if there's a jwt token in the response
    //       if (user && user.token) {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.currentUserSubject.next(user);
    //       }
    //       return user;
    //     })
    //   );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
