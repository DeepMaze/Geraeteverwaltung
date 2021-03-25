import { Injectable, Inject } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class LocalStorageService extends StorageService {

  constructor(@Inject('WINDOW') private window: any) {
    super(window.localStorage);
  }
}