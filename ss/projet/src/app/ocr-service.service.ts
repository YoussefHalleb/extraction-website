import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OcrServiceService {
  private apiUrl = 'http://localhost:7212/api/Ocr/process'; // Update with your API URL

  constructor(private http: HttpClient) {}

  processFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post(this.apiUrl, formData, {
        responseType: 'text', // Adjust response type based on your API response
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred!';
          if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorMessage = `Client-side error: ${error.error.message}`;
          } else {
            // Backend error
            errorMessage = `Server-side error: ${error.status} - ${error.message}`;
          }
          console.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
