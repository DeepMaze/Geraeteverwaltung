import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnInit {

    public loggedIn: boolean = false;

    constructor(private localStorage: LocalStorageService) { }

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

    login(loginData: { userName: string, passWord: string }): void {
        console.log("userName: ", loginData.userName);
        console.log("passWord: ", loginData.passWord);
    }
}