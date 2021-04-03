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

    async prepareLogin(asGuest: boolean = false): Promise<void> {
        try {
            if (asGuest) { var result = await this.authService.login(environment.guestData); }
            else { var result = await this.authService.login(this.userData); }
        } catch (err) {
            console.log(err);
        }
    }
}