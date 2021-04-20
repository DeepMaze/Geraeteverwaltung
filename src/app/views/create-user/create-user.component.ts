import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/service/api.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

    public loginData: LoginData = { userName: "", passWord: "" };

    constructor(
        private router: Router,
        private apiService: ApiService
    ) { }

    public createUser(): void {
        try {
            this.apiService.createUser(this.loginData).toPromise();
        } catch (err) {
            window.alert('Es gab ein Problem beim erstellen eines Benutzers!');
        }
    }

    public routeTo(routerLink: string): void {
        this.router.navigate([routerLink]);
    }
}