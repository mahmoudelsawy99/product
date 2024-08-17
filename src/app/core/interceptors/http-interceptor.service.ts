import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');

    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
           return this.authService.refreshToken().pipe(
            switchMap(() => {
               const newAuthToken = localStorage.getItem('authToken');
              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAuthToken}`
                }
              });
              return next.handle(clonedReq);
            }),
            catchError(err => {
               this.authService.logout();
              return throwError(err);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
