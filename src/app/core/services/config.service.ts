import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { AppConfig } from 'app/models/appConfig';
import { Sucursal } from 'app/models';

import { SetSucursalSuccessAction } from 'app/core/store/config/config.actions';
import * as fromRoot from 'app/reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class ConfigService {

  private config: any

  private apiUrl: string;

  private configurationUrl = 'assets/api-config.json';

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    this.configurationUrl = 'assets/api-config.json';
  }

  getAppConfig() {
    return this.config;
  }

  getCurrentSucursal(): Sucursal {
    return this.config.sucursal;
  }

  getApiUrl() {
    return this.getProperty('apiUrl');
  }

  buildApiUrl(endpoint: string) {
    return `${this.getApiUrl()}/${endpoint}`;
  }

  load(): Promise<any> {
    // console.log('Cargando configuracion en: ', this.configurationUrl);
    const promise = this.http.get(this.configurationUrl).toPromise();
    promise.then(config => {
      this.config = config;     // <--- THIS RESOLVES AFTER
      this.store.dispatch(new SetSucursalSuccessAction(config));
      // console.log(this.config);
    });
    return promise;
  }

  private getProperty(property: string): any {
    //noinspection TsLint
    if (!this.config) {
      throw new Error(`Attempted to access configuration property before configuration data was loaded,
      please double check that 'APP_INITIALIZER is properly implemented.`);
    }

    if (!this.config[property]) {
      throw new Error(`
      Required property ${property} was not defined within the configuration object. Please double check the
      assets/config.json file`);
    }
    return this.config[property];
  }

}
