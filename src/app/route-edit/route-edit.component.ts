import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.css']
})
export class RouteEditComponent implements OnInit {

  generating: boolean;
  id: number;
  options: any = {};
  backendUrl = 'http://localhost:1337';
  generated: any;

  public generateRoute() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.http.post<any>(this.backendUrl + '/route/generate', {id, options: this.options}, httpOptions)
          .pipe(
            tap(heroes => console.log(`fetched`)),
            catchError(this.handleError('generateRoute', []))
          )
          .subscribe(r => this.generated = r);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

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

  ngOnInit() {
    this.id = 1;
    this.options = [30, 10, 0.6, 5, 0.2, 6];
    this.generateRoute();
  }

}
