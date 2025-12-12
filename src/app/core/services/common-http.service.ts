import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {
  private readonly baseUrl = environment.apiUrl;
  private readonly defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private readonly http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${endpoint}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${endpoint}`, body, { headers: this.defaultHeaders })
      .pipe(catchError((error) => this.handleError(error)));
  }

  put<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${endpoint}`, body, { headers: this.defaultHeaders })
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${endpoint}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP error:', error.message, error.error);
    return throwError(() => new Error(error.message));
  }
}
