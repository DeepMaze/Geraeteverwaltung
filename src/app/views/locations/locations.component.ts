import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService } from 'src/app/service/api.service';
import { Location } from "../../interfaces/location.interface";

@Component({
	selector: 'app-locations',
	templateUrl: './locations.component.html',
	styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

    public locationList: Array<Location> = [];
    public mutableFilteredLocationList: Array<Location> = [];

    public filterValue: string = '';

    public newLocation: Location = this.clearLocation();

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.prepareLocationList();
    }

    private clearLocation(): Location {
        return {
            ID: 0,
            label: '',
            DescriptiveInformation: '',
            Address: {
                Postalcode: '',
                City: '',
                Street: '',
            },
        };
    }

    private prepareLocationList(): void {
        this.apiService.getLocationList().toPromise()
            .then((locationList: Array<Location>) => {
                if (locationList && locationList.length != 0) {
                    this.locationList = JSON.parse(JSON.stringify(locationList));
                    this.mutableFilteredLocationList = JSON.parse(JSON.stringify(locationList));
                }
            })
            .catch((err: any) => {
                window.alert('Standort Liste konnte nicht abgefragt werden!')
            });
    }

    public async createLocation(location: Location): Promise<void> {
        await this.apiService.createLocation(location).toPromise()
            .then((result: any) => {
                window.alert('Standort wurder erstellt!');
                this.newLocation = this.clearLocation();
            })
            .catch((err: any) => {
                window.alert('Standort konnte nicht erstellt werden!')
            });
        await this.apiService.getLocationID(location).toPromise()
            .then((result: any) => {
                location.ID = result.ID;
                this.locationList.push(location);
                this.doFilter(this.filterValue);
            })
            .catch((err: any) => {
                window.alert('Standort konnte nicht erstellt werden!')
            });
    }

    public updateLocation(locationID: number): void {
        var location: Location = this.mutableFilteredLocationList.filter((value) => {
            return value.ID == locationID;
        })[0];
        this.apiService.updateLocation(location).toPromise()
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
        if (filterValue == '') {
            this.mutableFilteredLocationList = this.locationList;
            return;
        }
        var regex: RegExp = new RegExp(`/${filterValue}/i`);
        this.mutableFilteredLocationList = this.locationList.filter((value: any) => {
            var keys: Array<string> = Object.keys(value);
            var matchAny: boolean = false;
            for (let index: number = 0; index < keys.length; index++) {
                matchAny = regex.test(value[keys[index]]);
                if (matchAny) {
                    break;
                }
            }
            return matchAny;
        })
    }

    public cancel(index: number) {
        var locationTEMP = this.locationList.filter((value: Location) => {
            return value.ID == this.mutableFilteredLocationList[index].ID;
        })[0];
        this.mutableFilteredLocationList[index] = JSON.parse(JSON.stringify(locationTEMP));
    }

    public deleteLocation(locationID: number): void {
        this.apiService.deleteLocation(locationID.toString()).toPromise()
            .then((result: any) => {
                window.alert('Standort wurde gelöscht!');
                var index: number;
                index = this.locationList.findIndex((value: Location) => { return value.ID == locationID; });
                if (index != -1) { this.locationList.splice(index, 1); }
                index = this.mutableFilteredLocationList.findIndex((value: Location) => { return value.ID == locationID; });
                if (index != -1) { this.mutableFilteredLocationList.splice(index, 1); }

            })
            .catch((err: any) => {
                window.alert('Standort konnte nicht gelöscht werden!')
            });
    }
}
