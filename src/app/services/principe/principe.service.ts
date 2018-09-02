import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrincipeService {

  id = 1;
  principes: {id: string, [key: string]: any}[] = [];

  constructor(public http: HttpClient) { }

  gets(): Observable<any[]> {
    return of(this.principes).pipe(
      delay(200)
    );
  }
  get(id: string): Observable<any> {
    return of(this.principes.find(p => p.id === id)).pipe(
      delay(200)
    );
  }
  post(body: any): Observable<any> {
    console.log(body)
    const principe = {...body, id: `${++this.id}`, pictureName: body.picture, picture: 'assets/imgs/img.jpg'};
    this.principes.push(principe);
    return of(principe).pipe(
      delay(200)
    );
  }
  put(id: string, body: any): Observable<any> {
    const index = this.principes.findIndex(p => p.id === id);
    this.principes[index] = {...body, id};
    return of(this.principes[index]).pipe(
      delay(200)
    );
  }
  delete(id: string): Observable<any> {
    this.principes = this.principes.filter(p => p.id !== id);
    return of(undefined).pipe(
      delay(200)
    );
  }
}
