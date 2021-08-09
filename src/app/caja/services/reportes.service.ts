import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import {Sucursal} from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class ReportesService {

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.sucursal = configService.getCurrentSucursal();

  }


  runReport(reportUrl: string, reportParams: {}) {

    reportParams['SUCURSAL'] = this.sucursal.id;
    console.log(`Reporte ${reportUrl} Params: `, reportParams);
    const url = this.configService.buildApiUrl(reportUrl);
    let params = new HttpParams()
    if (reportParams) {
      _.forIn(reportParams, (value, key) => {
        params = params.set(key, value.toString());
      });
    }
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

}
