import { Injectable, OnInit } from '@angular/core';

import { LocalStorageService } from "./local-storage.service";
import { ApiService } from "../service/api.service";

import { LoginData } from '../interfaces/login-data';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnInit {

    public loggedIn: boolean = false;

    constructor(
        private localStorage: LocalStorageService,
        private apiService: ApiService) { }

    ngOnInit(): void {
        this.updateLoggedIn();
    }

    updateLoggedIn(): void {
        this.localStorage.watch("token").subscribe((result) => {
            // this.loggedIn = result;
        });
    }

    checkToken(): boolean {
        return false;
    }

    async login(loginData: LoginData): Promise<boolean> {
        try {
            var result = await this.apiService.login(loginData);
        } catch (err) {
            throw err;
        }
        return !!result;
    }
}