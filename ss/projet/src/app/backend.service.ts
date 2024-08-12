import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private url = 'http://localhost:5200/api/Transactions';
  private urls = 'http://localhost:5200/api/Registration/registration';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.url).pipe(catchError(this.handleError));
  }

  getDataById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  postData(data: any): Observable<any> {
    return this.http
      .post<any>(this.url, data, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  postDatas(data: any): Observable<string> {
    return this.http
      .post(this.urls, data, { responseType: 'text' }) // Specify responseType as 'text'
      .pipe(
        map((response) => response as string), // Convert response to string
        catchError(this.handleError)
      );
  }

  deleteData(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  private httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  login(data: any): Observable<any> {
    return this.http
      .post(this.urls, data, this.httpOptions())
      .pipe(catchError(this.handleError));
  }
}
