import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Device } from '../interfaces/device.interface';
import { LoginData } from '../interfaces/login-data';
import { UserData } from '../interfaces/user-data';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private httpClient: HttpClient) { }

    async login(loginData: LoginData): Promise<UserData> {
        var httpParams = new HttpParams();
        httpParams.append('userName', loginData['userName'])
        httpParams.append('passWord', loginData['passWord'])
        try {
            var requestResult: UserData = await <Promise<UserData>>this.httpClient.get(`${environment.apiUrl}/login/login`, { params: httpParams }).toPromise();
        } catch (err) {
            throw err;
        }
        console.log("Login result: ", requestResult);
        return requestResult;
    }

    async createUser(loginData: LoginData): Promise<boolean> {
        var httpParams = new HttpParams();
        httpParams.append('userName', loginData['userName'])
        httpParams.append('passWord', loginData['passWord'])
        try {
            var requestResult = await <Promise<boolean>>this.httpClient.get(`${environment.apiUrl}/users/createUser`, { params: httpParams }).toPromise();
        } catch (err) {
            throw err;
        }
        console.log("Create User result: ", requestResult);
        return requestResult;
    }

    getDeviceList(): Array<Device | null> {
        this.httpClient.get
        return [];
    }
}
