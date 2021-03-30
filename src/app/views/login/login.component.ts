import { Component, OnInit } from '@angular/core';
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

    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void { }

    prepareLogin(asGuest: boolean = false): void {
        if (asGuest) { this.authService.login(environment.guestData); }
        else { this.authService.login(this.userData); }
    }
}