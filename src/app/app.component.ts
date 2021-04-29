import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthenticationService } from "./service/authentication.service";
import { ConfigService } from './service/config.service';
import { LocalStorageService } from './service/local-storage.service';
import { Config } from './interfaces/config.interface';
import { ApiService } from './service/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public title: string = '';
    public currentURL: string = '';
    public canDeleteAccount: boolean = false;

    private routeTitles = [
        { route: "/", title: "Geräteverwaltung" },
        { route: "/login", title: "Anmeldung" },
        { route: "/createUser", title: "Account erstellen" },
        { route: "/devices", title: "Geräteverwaltung" },
        { route: "/locations", title: "Geschäftsstellenverwaltung" },
        { route: "/users", title: "Benutzerverwaltung" },
        { route: "/persons", title: "Personenverwaltung" }
    ]

    constructor(
        private router: Router,
        public authService: AuthenticationService,
        private apiService: ApiService,
        public configService: ConfigService,
        private localStorage: LocalStorageService
    ) { }

    public ngOnInit(): void {
        this.canDeleteAccount = this.localStorage.get('userName').toLowerCase() != 'admin' && this.localStorage.get('userName').toLowerCase() != 'guest';
        this.localStorage.initiateStorage();
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.currentURL = event.url.split('#')[0];
                let newTitle = this.routeTitles.find(route => { return route.route === event.url }) || { title: "undefined" };
                this.title = newTitle.title;
                if (event.url.split('#').length >= 2 && this.authService.asGuest && !this.configService.config.enableGuestDataManipulation) {
                    this.router.navigateByUrl(this.currentURL);
                }
            }
        })
    }

    public saveConfig(): void {
        this.configService.saveConfig();
    }

    public logout(): void {
        this.authService.logout();
    }

    public async deleteAccount(): Promise<void> {
        try {
            await this.apiService.deleteUser().toPromise();
            window.alert('Ihr Account wurde gelöscht, Sie werden auf die Login Seite weitergeleitet.')
            this.authService.logout();
        } catch (err) {
            window.alert('Es gab ein Problem beim Löschen des Accounts.')
        }
    }
}