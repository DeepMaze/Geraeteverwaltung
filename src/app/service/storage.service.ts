import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private storage: Storage;
    private subjects: Map<string, BehaviorSubject<string>> = new Map<string, BehaviorSubject<string>>();

    constructor(storage: Storage) {
        this.storage = storage;
    }

    private prepareStorage(key: string): any {
        var storageItem: string = this.storage.getItem(key) || '';
        if (!storageItem || storageItem == 'undefined') {
            storageItem = '';
            this.storage.setItem(key, storageItem);
        }
        var doesKeyExist: boolean = this.subjects.has(key);
        if (!doesKeyExist) {
            this.subjects.set(key, new BehaviorSubject<string>(storageItem));
        }
        var subjectItem: BehaviorSubject<string> = this.subjects.get(key) || new BehaviorSubject<string>(storageItem);
        subjectItem.next(storageItem);
        return { storageItem, subjectItem };
    }

    public watch(key: string): Observable<any> {
        var { subjectItem } = this.prepareStorage(key);
        return subjectItem?.asObservable();
    }

    public get(key: string): string {
        var { storageItem } = this.prepareStorage(key);
        return storageItem;
    }

    public set(key: string, value: any): void {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }
        this.storage.setItem(key, value);
        var doesKeyExist: boolean = this.subjects.has(key);
        if (!doesKeyExist) {
            this.subjects.set(key, new BehaviorSubject<string>(value));
        }
        var subjectItem: BehaviorSubject<string> = this.subjects.get(key) || new BehaviorSubject<string>(value);
        subjectItem.next(value);
    }

    public remove(key: string): void {
        var doesKeyExist: boolean = this.subjects.has(key);
        if (!doesKeyExist) {
            this.subjects.get(key)?.complete();
        }
        this.subjects.delete(key);
        this.storage.removeItem(key);
    }

    public clear(): void {
        this.subjects.clear();
        this.storage.clear();
    }

    public async printStorage(): Promise<void> {
        console.log('--------------- START: PRINT STORAGE');
        console.log('Size: ', this.subjects.size);
        if (this.subjects.size != 0) {
            for (let key of this.subjects.keys()) {
                this.subjects.get(key)?.subscribe((result: string) => {
                    console.log(`${key}: `, result);
                });
            }
        }
        console.log('--------------- END');
    }
}