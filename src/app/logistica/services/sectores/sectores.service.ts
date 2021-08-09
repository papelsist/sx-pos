import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import {Sector} from 'app/logistica/models/sector';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class SectoresService {

  private apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService)
  {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/sectores');
  }

  get(id: string): Observable<Sector> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Sector>(url)
  }

  peidnetes(documento?: string ) {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Sector[]>(this.apiUrl, {params: params})
  }

  list(filtro: any = {} ): Observable<Sector[]> {
    let params = new HttpParams()
      .set('sucursal', this.sucursal.id);
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http.get<Sector[]>(this.apiUrl, {params: params}).shareReplay();
  }

  save(sol: Sector) {
    return this.http.post(this.apiUrl, sol);
  }

  update(sol: Sector) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  print(sectorId: string) {
    const url = `${this.apiUrl}/print/${sectorId}`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

  productosSinSector() {
    const url = `${this.apiUrl}/productosSinSector`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

  recorridosPorLinea(reportParams = {}) {
    console.log(reportParams);
    const url = `${this.apiUrl}/recorridosPorLinea`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    let params = new HttpParams()
    if (reportParams) {
      _.forIn(reportParams, (value, key) => {
        if (value) {
          params = params.set(key, value.toString());
        }
      });
    }
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

}
