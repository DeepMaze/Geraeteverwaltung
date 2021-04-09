import { Injectable } from '@angular/core';

import { LocalStorageService } from "./local-storage.service";
import { ApiService } from "../service/api.service";

import { LoginData } from '../interfaces/login-data';
import { UserData } from '../interfaces/user-data';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public loggedIn: boolean = false;

    constructor(
        private localStorage: LocalStorageService,
        private apiService: ApiService
    ) {
        this.updateLoggedIn();
    }

    updateLoggedIn(): void {
        this.localStorage.watch('token').subscribe((result) => {
            this.loggedIn = !!result;
        });
    }

    async login(loginData: LoginData): Promise<boolean> {
        try {
            var loginResult: UserData = await this.apiService.login(loginData).toPromise();
        } catch (err) {
            throw err;
        }
        if (!loginResult) {
            return false;
        }
        this.localStorage.set('userID', loginResult.userID);
        this.localStorage.set('userName', loginResult.userName);
        this.localStorage.set('token', loginResult.token);
        return !!loginResult;
    }
}