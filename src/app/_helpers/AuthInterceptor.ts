import { Injectable } from "@angular/core";

import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from '../../app/@core/data/auth.service';
import { Router } from '@angular/router';
import { InterceptorSkipHeader } from "./InterceptorSkipHeader";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _auth_service: AuthService, private _router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.headers.has(InterceptorSkipHeader)) {

            const headers = request.headers.delete(InterceptorSkipHeader);

            let clonedRequest = request.clone({ headers });

            return next.handle(clonedRequest);

        } else {

            if (this._auth_service.isAuthenticated()) {

                const cloned_request = request.clone({

                    headers: request.headers.set("Authorization", "Bearer " + this._auth_service.authentication.token)

                });

                return next.handle(cloned_request);

            } else {

                this._router.navigateByUrl('/login');

            }

        }
    }
}