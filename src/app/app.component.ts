import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthenticationService } from "./service/authentication.service";
import { ConfigService } from './service/config.service';
import { LocalStorageService } from './service/local-storage.service';
import { Config } from './interfaces/config.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public title: string = '';
    public currentURL: string = '';

    private routeTitles = [
        { route: "/", title: "Geräteverwaltung" },
        { route: "/login", title: "Anmeldung" },
        { route: "/createUser", title: "Account erstellen" },
        { route: "/devices", title: "Geräteverwaltung" },
        { route: "/locations", title: "Geschäftsstellenverwaltung" },
        { route: "/users", title: "Benutzerverwaltung" },
    ]

    constructor(
        private router: Router,
        public authService: AuthenticationService,
        public configService: ConfigService,
        private localStorage: LocalStorageService
    ) { }

    public ngOnInit(): void {
        this.localStorage.initiateStorage();
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.currentURL = this.sanitizeCurrentURL(event.url);
                let newTitle = this.routeTitles.find(route => { return route.route === event.url }) || { title: "undefined" };
                this.title = newTitle.title;
            }
        })
    }

    public saveConfig(): void {
        this.configService.saveConfig();
    }

    public logout(): void {
        this.authService.logout();
    }

    private sanitizeCurrentURL(url: string): string {
        return url.split('#')[0];
    }
}
