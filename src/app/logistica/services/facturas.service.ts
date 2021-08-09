import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { ConfigService } from 'app/core/services/config.service';
import { Sucursal, Venta } from 'app/models';

@Injectable()
export class FacturasService {

  readonly apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) 
  {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('ventas');
  }
  
  list(filtro: any = {}): Observable<Venta[]> {

    let params = new HttpParams()
    .set('sucursal',this.sucursal.id);
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    })
    // const url = `${this.apiUrl}/facturados/${this.sucursal.id}`;
    const url = this.configService.buildApiUrl('cuentasPorCobrar');
    return this.http.get<Venta[]>(url, {params: params})
  }

  get(id: string): Observable<Venta> {
    const url = this.configService.buildApiUrl('cuentasPorCobrar/buscarVenta/' + id);
    return this.http.get<Venta>(url)
  }

  getPartidas(id: string): Observable<any> {
    const url = this.configService.buildApiUrl('cuentasPorCobrar/getPartidas/' + id);
    return this.http.get<any>(url)
  }
  
  
}
