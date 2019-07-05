import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private origin = window.location.origin;

  /**
   * 請求封裝
   * @param api
   * @param options
   */
  post(api: string = '', options = {}): Observable<any> {
    return this.http.post<any>(`${this.origin}/${api}`, options).pipe(
      tap(_ => {
        //do something for current status
      }),
      catchError(this.handleError<any>('getHospitalRecruit', {}))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.message.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  isAlterEgoTaken: (alterEgo: string) => Observable<boolean>;
  constructor(private http: HttpClient, private message: NzMessageService) {}
}
