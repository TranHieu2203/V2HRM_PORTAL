/*
Tannv: This code is based on the original blog post of Alexandru Bereghici
https://itnext.io/angular-tutorial-implement-refresh-token-with-httpinterceptor-bfa27b966f57
*/

import { filter, finalize, switchMap, tap, take, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { AuthService } from '../services/auth.service';


import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
   
    constructor(
        private authService: AuthService,
    ) {
    }
    private addTokenHeader(request: HttpRequest<any>, token: string) {
        if (token && !request.headers.has("skipTokenInterceptor")) {
          request = request.clone({
            withCredentials: true,
            headers: request.headers.set("Authorization", "Bearer " + token).delete("skipTokenInterceptor"),
          });
        }
        return request = request.clone({
          withCredentials: true,
          headers: request.headers.set("Accept", "application/json"),
        });
      }
      private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);
          const token = localStorage.getItem("token")!;
          if (token){
            return this.authService.refreshToken(token).pipe(
              switchMap((res: any) => {
                this.isRefreshing = false;
                localStorage.setItem("token",res.data.token);
                // this.tokenService.saveToken(token.accessToken);
                this.refreshTokenSubject.next(res.data.token);
                return next.handle(this.addTokenHeader(request, res.data.token));
              }),
              catchError((err) => {
                this.isRefreshing = false;
                this.authService.logout();
                return throwError(err);
              })
            );
    
          }
        }
        return this.refreshTokenSubject.pipe(filter(token => token !== null),
          take(1),
          switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        const token: string = localStorage.getItem("token")!;
        request = this.addTokenHeader(request,token);
        return next.handle(request)
        
        .pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
             }
            return event;
          }),
          catchError((err: HttpErrorResponse) => {
            if (err  && !request.url.includes('authen/applogin') && err.status === 401) {
              return this.handle401Error(request, next);
            }
            const error = err!.error!.message || err!.statusText;
            return throwError(error);
          })
        );
      }

}