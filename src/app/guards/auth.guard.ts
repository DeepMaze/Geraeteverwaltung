import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthenticationService } from "../service/authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log("state.url: ", state.url);
        var isTokenValid = this.authService.checkToken();
        if (state.url == "/") {
            if (!this.authService.loggedIn || !isTokenValid) { this.router.navigateByUrl("/login"); }
            else { return true; }
        }
        if (state.url == "/login") {
            if (this.authService.loggedIn && isTokenValid) { this.router.navigateByUrl("/logout"); }
            else { return true; }
        }
        if (state.url == "/logout") {
            if (this.authService.loggedIn) { return true; }
            else { this.router.navigateByUrl("/devices"); }
        }
        if (isTokenValid) { return true; }
        else { this.router.navigateByUrl("/login"); }
        return isTokenValid;
    }
}
