import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevicesComponent } from './views/devices/devices.component';
import { LocationsComponent } from './views/locations/locations.component';
import { UsersComponent } from './views/users/users.component';
import { LoginComponent } from './views/login/login.component';
import { CreateUserComponent } from './views/create-user/create-user.component';

@NgModule({
    declarations: [
        AppComponent,
        DevicesComponent,
        LocationsComponent,
        UsersComponent,
        LoginComponent,
        CreateUserComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
