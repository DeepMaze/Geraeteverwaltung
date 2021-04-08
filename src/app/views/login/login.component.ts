import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public userData = { userName: "", passWord: "" };

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void { }

    async prepareLogin(asGuest: boolean = false): Promise<void> {
        try {
            var result = await this.authService.login(asGuest ? environment.guestData : this.userData);
        } catch (err) {
            console.log(err);
            return;
        }
        if (result) { this.router.navigateByUrl("/devices"); }
    }

    routeTo(routerLink: string): void {
        this.router.navigateByUrl(routerLink);
        // this.router.navigate([routerLink]);
    }
}