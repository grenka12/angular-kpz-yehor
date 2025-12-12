import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommonHttpService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  get<T>(endpoint: string, options?: object) {
    return this.http
      .get<T>(`${this.baseUrl}${endpoint}`, options)
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: unknown, options?: object) {
    return this.http
      .post<T>(`${this.baseUrl}${endpoint}`, body, options)
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: unknown, options?: object) {
    return this.http
      .put<T>(`${this.baseUrl}${endpoint}`, body, options)
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, options?: object) {
    return this.http
      .delete<T>(`${this.baseUrl}${endpoint}`, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error', error.message, error.error);
    return throwError(() => error);
  }
}
