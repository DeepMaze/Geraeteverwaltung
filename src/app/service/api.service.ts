import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Device } from '../interfaces/device.interface';
import { LoginData } from '../interfaces/login-data';
import { UserData } from '../interfaces/user-data';
import { environment } from 'src/environments/environment';
import { observable, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private httpClient: HttpClient,
        private localStorage: LocalStorageService
    ) { }

    public login(loginData: LoginData): Observable<any> {
        var httpParams = {
            userName: loginData.userName,
            passWord: loginData.passWord
        };
        try {
            return this.httpClient.get(`${environment.apiUrl}/login/login`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public createUser(loginData: LoginData): Observable<any> {
        var httpParams = {
            userName: loginData.userName,
            passWord: loginData.passWord
        };
        try {
            return this.httpClient.get(`${environment.apiUrl}/user/createUser`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public getDeviceList(): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID')
        };
        try {
            return this.httpClient.get(`${environment.apiUrl}/device/getDeviceList`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public createDevice(device: Device): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID'),
            device: JSON.stringify(device)
        };
        try {
            return this.httpClient.post(`${environment.apiUrl}/device/createDevice`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public getDeviceID(device: Device): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID'),
            device: JSON.stringify(device)
        };
        try {
            return this.httpClient.get(`${environment.apiUrl}/device/getDeviceID`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public deleteDevice(deviceID: string): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID'),
            deviceID: deviceID
        };
        try {
            return this.httpClient.delete(`${environment.apiUrl}/device/deleteDevice`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public updateDevice(device: Device): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID'),
            device: JSON.stringify(device)
        };
        try {
            return this.httpClient.patch(`${environment.apiUrl}/device/deleteDevice`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }
}
