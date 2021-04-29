import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/service/api.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ConfigService } from 'src/app/service/config.service';
import { Device } from '../../interfaces/device.interface';
import { Location } from '../../interfaces/location.interface'
import { Person } from '../../interfaces/person.interface'

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

    public deviceList: Array<Device> = [];
    public mutableFilteredDeviceList: Array<Device> = [];
    public locationList: Array<Location> = [];
    public filteredLocationList: Array<Location> = [];
    public personList: Array<Person> = [];
    public filteredPersonList: Array<Person> = [];

    public filterValue: string = '';

    public newDevice: Device = this.clearDevice();

    constructor(
        private apiService: ApiService,
        public authService: AuthenticationService,
        public configService: ConfigService) { }

    public ngOnInit(): void {
        this.prepareDeviceList();
        this.prepareLocationList();
        this.preparePersonList();
    }

    private clearDevice(): Device {
        return {
            ID: 0,
            Label: '',
            DescriptiveInformation: '',
            SerialNumber: '',
            Manufacturer: '',
            Model: '',
            LocationID: 0,
            PersonID: 0,
        };
    }

    private prepareDeviceList(): void {
        this.apiService.getDeviceList().toPromise()
            .then((deviceList: Array<Device>) => {
                if (!deviceList || deviceList.length == 0) { return }
                this.deviceList = JSON.parse(JSON.stringify(deviceList));
                this.mutableFilteredDeviceList = JSON.parse(JSON.stringify(deviceList));
            })
            .catch((err: any) => {
                window.alert('Geräte Liste konnte nicht abgefragt werden!')
            });
    }

    private prepareLocationList(): void {
        this.apiService.getLocationList().toPromise()
            .then((locationList: Array<Location>) => {
                if (!locationList || locationList.length == 0) { return }
                this.locationList = JSON.parse(JSON.stringify(locationList));
                this.filteredLocationList = JSON.parse(JSON.stringify(locationList));
            })
            .catch((err: any) => {
                window.alert('Geräte Liste konnte nicht abgefragt werden!')
            });
    }

    private preparePersonList(): void {
        this.apiService.getPersonList().toPromise()
            .then((personList: Array<Person>) => {
                if (!personList || personList.length == 0) { return }
                this.personList = JSON.parse(JSON.stringify(personList));
                this.filteredPersonList = JSON.parse(JSON.stringify(personList));
            })
            .catch((err: any) => {
                window.alert('Geräte Liste konnte nicht abgefragt werden!')
            });
    }

    public async createDevice(device: Device): Promise<void> {
        await this.apiService.createDevice(device).toPromise()
            .then((result: any) => {
                window.alert('Gerät wurder erstellt!');
                this.newDevice = this.clearDevice();
            })
            .catch((err: any) => {
                window.alert('Gerät konnte nicht erstellt werden!')
            });
        await this.apiService.getDeviceID(device).toPromise()
            .then((result: any) => {
                device.ID = result.ID;
                this.deviceList.push(device);
                this.doFilter(this.filterValue);
            })
            .catch((err: any) => {
                window.alert('Gerät konnte nicht erstellt werden!')
            });
    }

    public updateDevice(deviceID: number): void {
        var device: Device = this.mutableFilteredDeviceList.filter((value) => {
            return value.ID == deviceID;
        })[0];
        this.apiService.updateDevice(device).toPromise()
            .then((result: any) => {
                window.alert('Änderungen wurde gespeichert!');
            })
            .catch((err: any) => {
                window.alert('Änderungen konnten nicht gespeichert werden!')
            });
    }

    public prepareFilter(event: any): void {
        this.doFilter(event.target.value);
    }

    private doFilter(filterValue: string): void {
        var regex: RegExp = new RegExp(`${filterValue}`, 'i');
        this.mutableFilteredDeviceList = this.deviceList.filter((value: any) => {
            var matchAny: boolean = false;
            for (var key in value) {
                matchAny = regex.test(value[key]);
                if (matchAny) { break; }
            }
            return matchAny;
        })
    }

    public cancel(index: number) {
        var deviceTEMP = this.deviceList.filter((value: Device) => {
            return value.ID == this.mutableFilteredDeviceList[index].ID;
        })[0];
        this.mutableFilteredDeviceList[index] = JSON.parse(JSON.stringify(deviceTEMP));
    }

    public deleteDevice(deviceID: number): void {
        this.apiService.deleteDevice(deviceID.toString()).toPromise()
            .then((result: any) => {
                window.alert('Gerät wurde gelöscht!');
                var index: number;
                index = this.deviceList.findIndex((value: Device) => { return value.ID == deviceID; });
                if (index != -1) { this.deviceList.splice(index, 1); }
                index = this.mutableFilteredDeviceList.findIndex((value: Device) => { return value.ID == deviceID; });
                if (index != -1) { this.mutableFilteredDeviceList.splice(index, 1); }

            })
            .catch((err: any) => {
                window.alert('Gerät konnte nicht gelöscht werden!')
            });
    }
}