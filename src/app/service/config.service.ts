import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Config } from '../interfaces/config.interface';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private config_original: Config = {
        enableGuestLogin: false,
        enableAccountCreation: true,
        enableGuestDataManipulation: false
    }

    public config: Config = {
        enableGuestLogin: false,
        enableAccountCreation: true,
        enableGuestDataManipulation: false
    }

    constructor(
        private apiService: ApiService
    ) {
        this.getConfigFromDB();
    }

    private async getConfigFromDB(): Promise<void> {
        var result = await this.apiService.getConfig().toPromise()
        var config_temp: any = {};
        result.forEach((element: any) => {
            config_temp[element['Config_Key']] = (element['Config_Value'] == 1) ? (true) : (false);
        })
        this.config_original = config_temp;
        this.config = config_temp;
    }

    public async saveConfig(): Promise<void> {
        await this.apiService.saveConfig(this.config).toPromise()
        this.getConfigFromDB();
    }

    public restoreConfig(): void {
        this.config = this.config_original;
    }
}