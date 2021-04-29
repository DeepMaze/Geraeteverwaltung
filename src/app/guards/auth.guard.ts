import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from "../service/authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (state.url == "/") {
            if (!this.authService.loggedIn) { this.router.navigateByUrl("/login"); }
            else { return true; }
        }
        if (state.url == "/login" || state.url == "/createUser") {
            if (this.authService.loggedIn && this.authService.loggedIn) { this.router.navigateByUrl("/devices"); }
            else { return true; }
        }
        if (state.url == "/logout") {
            if (this.authService.loggedIn) { return true; }
            else { this.router.navigateByUrl("/login"); }
        }
        if (this.authService.loggedIn) { return true; }
        else { this.router.navigateByUrl("/login"); }
        return this.authService.loggedIn;
    }
}
