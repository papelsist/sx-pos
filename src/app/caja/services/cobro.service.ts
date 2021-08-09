import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Cobro } from 'app/models/cobro';
import {Cliente, Sucursal} from 'app/models';

import {Store} from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class CobroService {

  private apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private configService: ConfigService
  ) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('cxc/cobro');
  }

  get(id: string): Observable<Cobro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cobro>(url)
  }

  peidnetes(documento?: string ) {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Cobro[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<Cobro[]> {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Cobro[]>(this.apiUrl, {params: params})
  }

  save(sol: Cobro): Observable<Cobro> {
    console.log('Salvando cobro: ', sol);
    return this.http.post<Cobro>(this.apiUrl, sol);
  }

  update(sol: Cobro) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  buscarDisponibles(cliente: Cliente): Observable<Cobro[]> {
    const url = `${this.apiUrl}/buscarDisponibles/${cliente.id}`;
    return this.http.get<Cobro[]>(url);
  }

  buscarDisponiblesMC(cliente: Cliente): Observable<Cobro[]> {
    const url = `${this.apiUrl}/buscarDisponiblesMC/${cliente.id}`;
    return this.http.get<Cobro[]>(url);
  }

  reporteDeArque(fecha) {
    const url = this.configService.buildApiUrl('tesoreria/reporteDeAarqueoCaja');
    const params = new HttpParams()
      .set('SUCURSAL', this.sucursal.id)
      .set('fecha', fecha);
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

  relacionDeFichasCaja(result) {
    console.log('Fichas: ', result)
    const url = this.configService.buildApiUrl('tesoreria/reporteDeFichas');
    const params = new HttpParams()
      .set('SUCURSAL', this.sucursal.id)
      .set('origen', result.tipo)
      .set('fecha', result.fecha);
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
