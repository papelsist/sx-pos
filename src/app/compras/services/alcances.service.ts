import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class AlcancesService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('alcances');
  }

  list(filtro: any = {}): Observable<any[]> {
    const url = `${this.apiUrl}/list`;
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http.get<any[]>(url, { params: params });
  }

  generar(command): Observable<any> {
    console.log('Generando alcance: ', command);
    const url = `${this.apiUrl}/generar`;
    let params = new HttpParams();
    _.forIn(command, (value, key) => {
      params = params.set(key, value);
    });
    return this.http.post<Observable<any>>(url, command);
  }

  generarOrden(proveedor: string, partidas: any[]): Observable<any> {
    const command = { proveedor, partidas };
    const url = `${this.apiUrl}/generarOrden`;
    return this.http.post<Observable<any>>(url, command);
  }

  reporte(data) {
    let params = new HttpParams();
    _.forIn(data, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/print`;
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob',
      params: params
    });
  }

  actualizarMeses(meses: number): Observable<any> {
    const url = `${this.apiUrl}/actualizarMeses`;
    const params = new HttpParams().set('meses', meses.toString());
    return this.http.put<Observable<any>>(url, {}, { params: params });
  }
}
