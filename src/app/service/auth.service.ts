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

maximum depth within the object and provide the field names to reach that depth


function getMaxObjectDepthWithFieldNames(obj) {
  let maxDepth = 0;
  let maxFieldNames = [];

  function findMaxDepth(currentObj, depth, fieldNames) {
    if (typeof currentObj !== 'object' || currentObj === null) {
      if (depth > maxDepth) {
        maxDepth = depth;
        maxFieldNames = [...fieldNames];
      }
      return;
    }

    for (const key in currentObj) {
      if (currentObj.hasOwnProperty(key)) {
        fieldNames.push(key);
        findMaxDepth(currentObj[key], depth + 1, fieldNames);
        fieldNames.pop();
      }
    }
  }

  findMaxDepth(obj, 0, []);

  return { maxDepth, maxFieldNames };
}

const myObject = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: {
        f: 3
      }
    }
  }
};

const result = getMaxObjectDepthWithFieldNames(myObject);
console.log(`Max Depth: ${result.maxDepth}`);
console.log("Field Names: " + result.maxFieldNames.join(" > "));
