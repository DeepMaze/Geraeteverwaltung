import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from "./service/authentication.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public title: string = "";

    private routeTitles = [
        { route: "/", title: "Geräteverwaltung" },
        { route: "/devices", title: "Geräteverwaltung" },
        { route: "/locations", title: "Geschäftsstellenverwaltung" },
        { route: "/users", title: "Benutzerverwaltung" },
    ]

    constructor(
        private router: Router,
        public authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                let newTitle = this.routeTitles.find(route => { return route.route === event.url }) || { title: "undefined" };
                this.title = newTitle.title;
            }
        })
    }

    public logout(): void {
        this.authService.logout();
    }
}
