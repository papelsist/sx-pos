import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Traslado } from 'app/logistica/models/traslado';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class TrasladosService {
  private apiUrl: string; //= environment.apiUrl + '/inventario/traslados';

  sucursal: Sucursal;

  

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/traslados');
  }

  get(id: string): Observable<Traslado> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Traslado>(url);
  }

  list(filtro: any = {}): Observable<Traslado[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http.get<Traslado[]>(this.apiUrl, { params: params });
  }

  update(traslado: Traslado) {
    const url = `${this.apiUrl}/${traslado.id}`;
    return this.http.put(url, traslado);
  }

  print(tps: Traslado, comentario: string = '') {
    const endpoint = tps.uuid ? 'printCfdi' : 'print';
    const url = `${this.apiUrl}/${endpoint}`;
    const params = new HttpParams()
      .set('ID', tps.id)
      .set('COMENTARIO', comentario);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }

  mostrarXml(tps: Traslado): Observable<any> {
    const endpoint = `cfdis/mostrarXml/${tps.cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  darSalida(tps: Traslado) {
    const url = `${this.apiUrl}/salida/${tps.id}`;
    return this.http.put(url, tps);
  }

  timbrar(tps: Traslado) {
    const url = `${this.apiUrl}/timbrar/${tps.id}`;
    return this.http.put(url, tps);
  }

  darEntrada(tpe: Traslado) {
    const url = `${this.apiUrl}/entrada/${tpe.id}`;
    return this.http.put(url, tpe);
  }

  choferes(): Observable<Array<any>> {
    const endpoint = 'embarques/choferes';
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.get<Array<any>>(url);
  }

  reporteRelacionTPS(reportParams: {}) {

    reportParams['sucursal'] = this.sucursal.id;
    console.log('Ejecutando reporte de Relacion de TPS con: ', reportParams);
    const url = `${this.apiUrl}/reportes/relaciontps`;
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

  reporteRelacionTPE(reportParams: {}) {

    reportParams['sucursal'] = this.sucursal.id;
    console.log('Ejecutando reporte de Relacion de TPS con: ', reportParams);
    const url = `${this.apiUrl}/reportes/relaciontpe`;
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

  reporteSolesPorAtender(reportParams: {}) {

    reportParams['sucursal'] = this.sucursal.id;
    console.log('Ejecutando reporte de Relacion de TPS con: ', reportParams);
    const url = `${this.apiUrl}/reportes/solesxatender`;
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

  reporteValesPorRecibir(reportParams: {}) {

    reportParams['sucursal'] = this.sucursal.id;
    console.log('Ejecutando reporte de Relacion de TPS con: ', reportParams);
    const url = `${this.apiUrl}/reportes/valesxrecibir`;
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
