import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class RouteService {
  constructor(private http: HttpClient) { }

  private backendUrl = 'http://localhost:1337/route/';

  get(id: number): Observable<any> {
    return this.http.get<any>(this.backendUrl + 'get?id=' + id)
      .pipe(
        tap(heroes => console.log('getting routes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  generateFrom(id: number, options: any): Observable<any> {
    return this.http.post<any>(this.backendUrl + 'generate', {id, options}, httpOptions)
      .pipe(
        tap(heroes => console.log('getting routes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
