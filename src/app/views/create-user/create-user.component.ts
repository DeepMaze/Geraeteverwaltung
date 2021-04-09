import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

    public userData = { userName: "", passWord: "" };

    constructor(
        private router: Router,
        private apiService: ApiService
    ) { }

    ngOnInit(): void { }

    createUser(): void {
        try {
            this.apiService.createUser(this.userData);
        } catch (err) {
            console.log(err);
            window.alert('Es gab ein Problem beim erstellen eines Benutzers!');
        }
    }

    routeTo(routerLink: string): void {
        this.router.navigate([routerLink]);
    }
}