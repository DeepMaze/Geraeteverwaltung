import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/service/api.service';
import { Person } from 'src/app/interfaces/person.interface';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

    public personList: Array<Person> = [];
    public mutableFilteredPersonList: Array<Person> = [];

    public filterValue: string = '';

    public newPerson: Person = this.clearPerson();

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.preparePersonList();
    }

    private clearPerson(): Person {
        return {
            ID: 0,
            FirstName: '',
            LastName: '',
            Company: ''
        };
    }

    private preparePersonList(): void {
        this.apiService.getPersonList().toPromise()
            .then((personList: Array<Person>) => {
                if (personList && personList.length != 0) {
                    this.personList = JSON.parse(JSON.stringify(personList));
                    this.mutableFilteredPersonList = JSON.parse(JSON.stringify(personList));
                }
            })
            .catch((err: any) => {
                window.alert('Standort Liste konnte nicht abgefragt werden!')
            });
    }

    public async createPerson(person: Person): Promise<void> {
        await this.apiService.createPerson(person).toPromise()
            .then((result: any) => {
                window.alert('Standort wurder erstellt!');
                this.newPerson = this.clearPerson();
            })
            .catch((err: any) => {
                window.alert('Standort konnte nicht erstellt werden!')
            });
        await this.apiService.getPersonID(person).toPromise()
            .then((result: any) => {
                person.ID = result.ID;
                this.personList.push(person);
                this.doFilter(this.filterValue);
            })
            .catch((err: any) => {
                window.alert('Standort konnte nicht erstellt werden!')
            });
    }

    public updatePerson(personID: number): void {
        var person: Person = this.mutableFilteredPersonList.filter((value) => {
            return value.ID == personID;
        })[0];
        this.apiService.updatePerson(person).toPromise()
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
            this.mutableFilteredPersonList = this.personList;
            return;
        }
        var regex: RegExp = new RegExp(`/${filterValue}/i`);
        this.mutableFilteredPersonList = this.personList.filter((value: any) => {
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
        var personTEMP = this.personList.filter((value: Person) => {
            return value.ID == this.mutableFilteredPersonList[index].ID;
        })[0];
        this.mutableFilteredPersonList[index] = JSON.parse(JSON.stringify(personTEMP));
    }

    public deletePerson(personID: number): void {
        this.apiService.deletePerson(personID.toString()).toPromise()
            .then((result: any) => {
                window.alert('Standort wurde gelöscht!');
                var index: number;
                index = this.personList.findIndex((value: Person) => { return value.ID == personID; });
                if (index != -1) { this.personList.splice(index, 1); }
                index = this.mutableFilteredPersonList.findIndex((value: Person) => { return value.ID == personID; });
                if (index != -1) { this.mutableFilteredPersonList.splice(index, 1); }

            })
            .catch((err: any) => {
                window.alert('Standort konnte nicht gelöscht werden!')
            });
    }
}
