import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id = 0;
  users: {id: string, name: string, email: string, password: string}[] = [
    {id: '1', email: 'sben@sben', name: 'sben', password: 'Sben42Sben'}
  ];

  constructor(public http: HttpClient) { }

  checkCredentials(credentials: {login: string, password: string}): boolean {
    return this.users.some(u => u.email === credentials.login && u.password === credentials.password);
  }

  checkUser(user: {name: string, email: string, password: string}): boolean {
    return this.users.every(u => u.email !== user.email);
  }

  loginRequest(credentials: {login: string, password: string}): Observable<{user: any, token: string}> {
    return this.checkCredentials(credentials)
      ? of(true).pipe(
        delay(200),
        switchMap(() => {
          return of({
            user: {...this.users.find(u => u.email === credentials.login), password: undefined},
            token: `xxx-${this.users.find(u => u.email === credentials.login).id}-xxx`
          });
        })
      )
      : of(false).pipe(
        delay(200),
        switchMap(() => {
          throw new Error('Authentication: Wrong credentials');
        })
      )
  }

  createUserRequest(user: {name: string, email: string, password: string}): Observable<any> {
    return this.checkUser(user)
      ? of(true).pipe(
        delay(2000),
        switchMap(() => {
          return of({
            id: `${++this.id}`,
            name: user.name,
            email: user.email
          }).pipe(
            tap(() => this.users.push({...user, id: `${this.id}`}))
          )
        })
      )
      : of(false).pipe(
        delay(2000),
        switchMap(() => {
          throw new Error('Create User: Email already exists');
        })
      )
  }
}
