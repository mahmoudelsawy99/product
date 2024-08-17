import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth/login';
  private refreshUrl = 'https://dummyjson.com/auth/refresh';
  private meUrl = 'https://dummyjson.com/auth/me';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => this.handleLogin(response)),
      catchError(this.handleError<any>('login'))
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return of(null);
    }

    return this.http.post<any>(this.refreshUrl, { refreshToken }).pipe(
      tap(response => this.handleLogin(response)),
      catchError(this.handleError<any>('refreshToken'))
    );
  }

  private handleLogin(response: any): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return of(null);
    }

    return this.http.get<any>(this.meUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe(
      catchError(this.handleError<any>('getUserDetails'))
    );
  }
}
