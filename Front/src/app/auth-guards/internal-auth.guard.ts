import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class InternalAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let permission = -1;
        try {
            let token = this.authService.getToken();
            if (!token) {
                throw new Error("Could not read token");
            }
            const decoded = jwtDecode<any>(token);
            permission = decoded.permission;
        }
        finally {
            if (permission === -1) {
                this.router.navigateByUrl('/autenticacao');
            }
            else if (permission > 200) {
                this.router.navigateByUrl('/documentos/pendentes');
            }

            return permission < 200 && permission > -1;
        }
    }
}