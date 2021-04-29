import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../service/authentication.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { ConfigService } from 'src/app/service/config.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    public loginData: LoginData = { userName: "", passWord: "" };

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        public configService: ConfigService
    ) { }

    public async prepareLogin(asGuest: boolean = false): Promise<void> {
        try {
            var result: any = await this.authService.login(asGuest ? environment.guestData : this.loginData);
        } catch (err) {
            window.alert('Sie konnten nicht eingeloggt werden. Bitte prüfen Sie Ihre Daten!');
        }
        if (result) {
            this.router.navigateByUrl("/devices");
        }
    }

    public routeTo(routerLink: string): void {
        this.router.navigateByUrl(routerLink);
    }
}