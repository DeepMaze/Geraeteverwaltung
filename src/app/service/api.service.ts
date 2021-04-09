import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Device } from '../interfaces/device.interface';
import { LoginData } from '../interfaces/login-data';
import { UserData } from '../interfaces/user-data';
import { environment } from 'src/environments/environment';
import { observable, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private httpClient: HttpClient) { }

    public login(loginData: LoginData): Observable<any> {
        var httpParams = { userName: loginData.userName, passWord: loginData.passWord };
        try {
            return this.httpClient.get(`${environment.apiUrl}/login/login`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public createUser(loginData: LoginData): Observable<any> {
        var httpParams = { userName: loginData.userName, passWord: loginData.passWord };
        try {
            return this.httpClient.get(`${environment.apiUrl}/user/createUser`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }
}
