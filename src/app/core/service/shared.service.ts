import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SharedService {

  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }

  standardGet(url: string, err: string, httpOptions?): Observable<any> {
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError(err)));
  }

  standardGetText(url: string, err: string): Observable<any> {
    return this.http.get(url, {responseType: 'text'}).pipe(catchError(this.handleError(err)));
  }

  standardPut(url: string, body: any, err: string, success?: string): Observable<any> {
    if (success) {
      return this.http.put(url, body).pipe(
        tap(_ => this.log(`${success}`, 'success')),
        catchError(this.handleError(err))
      );
    } else {
      return this.http.put(url, body).pipe(catchError(this.handleError(err)));
    }
  }

  standardPost(url: string, body: any, err: string, success?: string): Observable<any> {
    if (success) {
      return this.http.post(url, body).pipe(
        tap(_ => this.log(`${success}`, 'success')),
        catchError(this.handleError(err))
      );
    } else {
      return this.http.post(url, body).pipe(catchError(this.handleError(err)));
    }
  }

  formPost(url: string, arr: any, err: string, success?: string): Observable<any> {
    if (arr.length > 0) {
      let formData = new FormData();
      for (let element of arr) {
        formData.append(element.key, element.value);
      }
      if (success) {
        return this.http.post(url, formData).pipe(
          tap(_ => this.log(`${success}`, 'success')),
          catchError(this.handleError(err))
        );
      } else {
        return this.http.post(url, formData).pipe(catchError(this.handleError(err)));
      }
    }
  }

  standardDelete(url: string, err: string, success?: string): Observable<any> {
    if (success) {
      return this.http.delete(url).pipe(
        tap(_ => this.log(`${success}`, 'success')),
        catchError(this.handleError(err))
      );
    } else {
      return this.http.delete(url).pipe(catchError(this.handleError(err)));
    }
  }

  handleError<T>(err: string) {
    return (error): Observable<T> => {
      console.error(error);
      this.log(err, 'error');
      return of();
    }
  }

  log(message: string, type: string) {
    this.toastr[type](message);
  }
}
