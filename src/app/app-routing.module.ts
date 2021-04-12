import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevicesComponent } from "./views/devices/devices.component";
import { LocationsComponent } from "./views/locations/locations.component";
import { UsersComponent } from "./views//users/users.component";
import { LoginComponent } from "./views/login/login.component";
import { CreateUserComponent } from "./views/create-user/create-user.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    { path: '', canActivate: [AuthGuard], component: DevicesComponent },
    { path: '*', canActivate: [AuthGuard], component: DevicesComponent },
    { path: 'devices', canActivate: [AuthGuard], component: DevicesComponent },
    { path: 'locations', canActivate: [AuthGuard], component: LocationsComponent },
    { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
    { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
    { path: 'createUser', canActivate: [AuthGuard], component: CreateUserComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
