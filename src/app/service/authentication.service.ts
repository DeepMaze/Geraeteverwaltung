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
            console.log("tokenResult: ", result);
            this.loggedIn = !!result;
            console.log("loggedIn: ", this.loggedIn);
        });
    }

    async login(loginData: LoginData): Promise<boolean> {
        try {
            var result = await this.apiService.login(loginData);
        } catch (err) {
            throw err;
        }
        if (!result) { return false; }
        this.localStorage.set('userID', result.userID);
        this.localStorage.set('userName', result.userName);
        this.localStorage.set('token', result.token);

        this.localStorage.printStorage();
        return true;
    }
}