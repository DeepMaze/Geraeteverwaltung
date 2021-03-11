import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { DevicesComponent } from "./views/devices/devices.component";
import { LocationsComponent } from "./views/locations/locations.component";
import { UsersComponent } from "./views//users/users.component";
import { LoginComponent } from "./views/login/login.component";
import { LogoutComponent } from "./views/logout/logout.component";

const routes: Routes = [
  { path: '*', component: AppComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
