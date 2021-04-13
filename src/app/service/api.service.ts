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

    // Login API calls

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

    // User API calls

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

    // Device API calls

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
            return this.httpClient.patch(`${environment.apiUrl}/device/updateDevice`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    // Location API calls

    public getLocationList(): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID')
        };
        try {
            return this.httpClient.get(`${environment.apiUrl}/location/getLocationList`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public createLocation(location: Location): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID'),
            location: JSON.stringify(location)
        };
        try {
            return this.httpClient.post(`${environment.apiUrl}/location/createLocation`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public getLocationID(location: Location): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID'),
            location: JSON.stringify(location)
        };
        try {
            return this.httpClient.get(`${environment.apiUrl}/location/getLocationID`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public deleteLocation(locationID: string): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID'),
            locationID: locationID
        };
        try {
            return this.httpClient.delete(`${environment.apiUrl}/location/deleteLocation`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }

    public updateLocation(location: Location): Observable<any> {
        var httpParams = {
            token: this.localStorage.get('token'),
            userID: this.localStorage.get('userID'),
            location: JSON.stringify(location)
        };
        try {
            return this.httpClient.patch(`${environment.apiUrl}/location/updateLocation`, { params: httpParams });
        } catch (err) {
            throw err;
        }
    }
}
