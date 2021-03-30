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
		return true;
	}

	login(userData: { userName: string, passWord: string }): void {
		console.log("userName: ", userData.userName);
		console.log("passWord: ", userData.passWord);
	}
}