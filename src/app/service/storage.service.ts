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

	watch(key: string): Observable<any> {
		var doesKeyExist = this.subjects.has(key);
		var storageItem: string = this.storage.getItem(key) || "";
		if (storageItem && typeof storageItem == 'string') { storageItem = JSON.parse(storageItem); }
		if (!doesKeyExist) { this.subjects.set(key, new BehaviorSubject<string>(storageItem)); }
		var subjectItem = this.subjects.get(key) || new BehaviorSubject<string>(storageItem);
		if (subjectItem) { subjectItem.next(storageItem); }
		return subjectItem?.asObservable();
	}

	get(key: string): any {
		var storageItem: string = this.storage.getItem(key) || "";
		if (storageItem && typeof storageItem == 'string') { storageItem = JSON.parse(storageItem); }
		return storageItem;
	}

	set(key: string, value: any) {
		this.storage.setItem(key, JSON.stringify(value));
		var doesKeyExist = this.subjects.has(key);
		if (!doesKeyExist) { this.subjects.set(key, new BehaviorSubject<string>(value)); }
		var subjectItem = this.subjects.get(key);
		if (subjectItem) { subjectItem.next(value); }
	}

	remove(key: string) {
		var doesKeyExist = this.subjects.has(key);
		if (!doesKeyExist) { this.subjects.get(key)?.complete(); }
		this.subjects.delete(key);
		this.storage.removeItem(key);
	}

	clear() {
		this.subjects.clear();
		this.storage.clear();
	}
}