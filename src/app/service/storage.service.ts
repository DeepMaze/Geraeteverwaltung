import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private storage: Storage;
    private subjects: Map<string, BehaviorSubject<string>> = new Map<string, BehaviorSubject<string>>();

    constructor(storage: Storage) {
        this.storage = storage;
    }

    public initiateStorage(): void {
        var storageItemKeys = Object.keys(this.storage);
        storageItemKeys.forEach(storageKey => {
            var storageItem = this.storage.getItem(storageKey);
            this.set(storageKey, storageItem);
        });
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
}