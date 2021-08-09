import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { FondoFijo } from 'app/caja/models/fondoFijo';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class FondoFijoService {

  readonly apiUrl: string;
  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('tesoreria/fondoFijo');
  }
  

  get(id: string): Observable<FondoFijo> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<FondoFijo>(url)
  }

  list(fecha: Date): Observable<FondoFijo[]> {
    const params = new HttpParams()
    .set('sucursal', this.sucursal.id)
    .set('fecha', fecha.toISOString());
    let url = `${this.apiUrl}/fondos`;
    return this.http.get<FondoFijo[]>(url, {params: params})
  }

  pendientes(): Observable<FondoFijo[]> {
    const params = new HttpParams()
    .set('sucursal', this.sucursal.id)
    let url = `${this.apiUrl}/pendientes`;
    return this.http.get<FondoFijo[]>(url, {params: params})
  }

  prepararRembolso(): Observable<FondoFijo> {
    let url = `${this.apiUrl}/prepararRembolso`;
    return this.http.get<FondoFijo>(url)
  }

  save(corte: FondoFijo) {
    corte.sucursal = this.sucursal
    return this.http.post(this.apiUrl, corte);
  }

  solicitarRembolso(gastos) {
    const data = {
      gastos: gastos,
    };
    const url = `${this.apiUrl}/solicitarRembolso`;
    return this.http.put(url, data);    
  }
  

  update(corte: FondoFijo) {
    return this.http.put(this.apiUrl+'/'+corte.id, corte);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

}
