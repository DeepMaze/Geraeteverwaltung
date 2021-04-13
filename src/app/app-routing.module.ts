import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./views/login/login.component";
import { CreateUserComponent } from "./views/create-user/create-user.component";
import { DevicesComponent } from "./views/devices/devices.component";
import { LocationsComponent } from "./views/locations/locations.component";
import { PersonsComponent } from "./views/persons/persons.component";
import { UsersComponent } from "./views//users/users.component";

const routes: Routes = [
    { path: '', canActivate: [AuthGuard], component: DevicesComponent },
    { path: '*', canActivate: [AuthGuard], component: DevicesComponent },
    { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
    { path: 'createUser', canActivate: [AuthGuard], component: CreateUserComponent },
    { path: 'devices', canActivate: [AuthGuard], component: DevicesComponent },
    { path: 'locations', canActivate: [AuthGuard], component: LocationsComponent },
    { path: 'persons', canActivate: [AuthGuard], component: PersonsComponent },
    { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
