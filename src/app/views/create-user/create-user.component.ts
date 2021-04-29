import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/service/api.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { ConfigService } from 'src/app/service/config.service';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

    public loginData: LoginData = { userName: "", passWord: "" };

    constructor(
        private router: Router,
        private configService: ConfigService,
        private apiService: ApiService
    ) { }

    public ngOnInit(): void {
        if (!this.configService.config.enableAccountCreation) {
            this.routeTo('/login');
        }
    }

    public async createUser(): Promise<void> {
        if (this.loginData.userName.toLowerCase() == 'guest' || this.loginData.userName.toLowerCase() == 'admin') {
            window.alert('\'Guest\' und \'Admin\' können nicht als Benutzername gewählt werden.');
            return;
        }
        try {
            await this.apiService.createUser(this.loginData).toPromise();
            window.alert('Der Benutzer wurde erstellt!');
        } catch (err) {
            window.alert('Es gab ein Problem beim erstellen eines Benutzers!');
        }
    }

    public routeTo(routerLink: string): void {
        this.router.navigate([routerLink]);
    }
}