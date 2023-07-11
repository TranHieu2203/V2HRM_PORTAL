import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import {CommonHttpRequestService, V2Hrm2022} from '../services/common-http-request.service'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService,
        private commonHttpRequestService: CommonHttpRequestService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authToken!:any;;
        if(!req.url.includes(V2Hrm2022.loginUrl)){
            authToken = this.auth.getAuthorizationToken();

        }
        // Get the auth token from the service.

        if (authToken === undefined) {
            return next.handle(req);
        }

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });


        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}