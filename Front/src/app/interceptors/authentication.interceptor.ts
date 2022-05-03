import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap, throwError } from "rxjs";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

// Responável por verificar se as requisições foram autenticadas.
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.authService.refresh();
            this.router.navigateByUrl('/');
            return throwError(() => err);
        }
        return throwError(() => err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));
    }
}