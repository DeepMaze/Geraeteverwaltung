import { Injectable, Inject } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class SessionStorageService extends StorageService {

  constructor(@Inject('WINDOW') private window: any) {
    super(window.sessionStorage);
  }
}