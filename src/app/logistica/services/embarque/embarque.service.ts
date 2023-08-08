import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Embarque } from 'app/logistica/models/embarque';
import { Venta } from 'app/models';
import { Envio } from 'app/logistica/models/envio';
import { VentaDet } from 'app/models/ventaDet';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class EmbarqueService {
  private apiUrl: string;

  sucursal: Sucursal;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('embarques/embarques');
  }

  get(id: string): Observable<Embarque> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Embarque>(url);
  }

  peidnetes(documento?: string) {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params = params.set('documento', documento);
    }
    return this.http.get<Embarque[]>(this.apiUrl, { params: params });
  }

  list(filter = {}): Observable<Embarque[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (filter) {
      _.forIn(filter, (value, key) => {
        params = params.set(key, value.toString());
      });
    }
    return this.http.get<Embarque[]>(this.apiUrl, { params: params });
  }

  transito(): Observable<Embarque[]> {
    const params = new HttpParams()
      .set('sucursal', this.sucursal.id)
      .set('transito', 'transito');
    return this.http.get<Embarque[]>(this.apiUrl, { params: params });
  }

  documentosEnTransito() {
    const url = `${this.apiUrl}/documentosEnTransito`;
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Array<any>>(url, { params: params });
  }

  enviosPendientes() {
    const url = `${this.apiUrl}/enviosPendientes`;
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Array<any>>(url, { params: params });
  }

  save(embarque: Embarque) {
    return this.http.post(this.apiUrl, embarque);
  }

  update(embarque: Embarque) {
    const target = {
      ...embarque
    };
    if (target.partidas) {
      target.partidas.forEach((item: any) => {
        delete item.dateCreated;
        delete item.lastUpdated;
        delete item.fechaDocumento;
        delete item.embarque;
      });
    }
    delete target.lastUpdated;
    delete target.dateCreated;
    const url = `${this.apiUrl}/${target.id}`;
    return this.http.put(url, target);
  }

  registrarSalida(embarque: Embarque) {
    const url = `${this.apiUrl}/registrarSalida/${embarque.id}`;
    return this.http.put(url, {});
  }

  registrarRegreso(embarque: Embarque): Observable<Embarque> {
    const url = `${this.apiUrl}/registrarRegreso/${embarque.id}`;
    return this.http.put<Embarque>(url, {});
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  deleteEnvio(id: string) {
    const url = this.configService.buildApiUrl('embarques/envios') + '/' + id;
    return this.http.delete(url);
  }

  buscarDocumento(sucursal, tipo, documento, fecha) {
    const params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha', fecha)
      .set('documento', documento)
      .set('tipo', tipo);
     console.log('Buscando documento con: ', params);
    const url = `${this.apiUrl}/buscarDocumento`;
    return this.http.get<any>(url, { params: params });
  }

  buscarVenta(sucursal, tipo, documento, fecha) {
    const params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha', fecha)
      .set('documento', documento)
      .set('tipo', tipo);
    const url = `${this.apiUrl}/buscarVenta`;
    return this.http.get<Venta>(url, { params: params });
  }

  buscarPartidasDeVenta(sucursal, tipo, documento, fecha) {
    const params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha', fecha)
      .set('documento', documento)
      .set('tipo', tipo);
    const url = `${this.apiUrl}/buscarPartidasDeVenta`;
    return this.http.get<VentaDet>(url, { params: params });
  }

  buscarTrasladosPendientes(): Observable<any> {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    const url = `${this.apiUrl}/buscarTrasladosPendientes`;
    return this.http.get(url, { params: params });
  }

  buscarDevolucionesPendientes(): Observable<any> {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    const url = `${this.apiUrl}/buscarDevolucionesPendientes`;
    return this.http.get(url, { params: params });
  }

  print(id: string) {
    console.log('Printing id: ', id);
    const url = `${this.apiUrl}/print`;
    const params = new HttpParams().set('ID', id);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }

  reporteDeEntregasPorChofer(reportParams: {}) {
    reportParams['sucursal'] = this.sucursal.id;
    // reportParams['CHOFER'] = '6f8b7d4a-aed7-11e7-b1f8-b4b52f67eab0';
    // reportParams['FECHA'] = new Date().toISOString()
    console.log(
      'Ejecutando reporte de entragas por chofer con: ',
      reportParams
    );
    const url = `${this.apiUrl}/reporteDeEntregasPorChofer`;
    let params = new HttpParams();
    if (reportParams) {
      _.forIn(reportParams, (value, key) => {
        params = params.set(key, value.toString());
      });
    }
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }

  reporteFacturaEnvio(reportParams: {}) {
      console.log('Procedo a ejecutar el reporte');

      console.log('Parametros recibidos', reportParams);

      const url = `${this.apiUrl}/reporteFacturaEnvio`;

      console.log('**********   ' + url)

      let params = new HttpParams();

      if (reportParams) {
          params = params.set('id', reportParams['id'].toString());
      }

      const headers = new HttpHeaders().set('Content-type', 'application/pdf');
      return this.http.get(url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      });



  }
  reporteEnvioPasan(reportParams: {}) {
    reportParams['sucursal'] = this.sucursal.id;
    console.log('Ejecutando reporte de Pasan Enviadas: ', reportParams);
    const url = `${this.apiUrl}/reporteEnvioPasan`;
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

  reporteValidacionEntregas(reportParams: {}) {
    reportParams['sucursal'] = this.sucursal.id;
    console.log('Ejecutando reporte de Validacion de Entregas: ', reportParams);
    const url = `${this.apiUrl}/reporteValidacionEntregas`;
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

  getEnvio(id: string): Observable<Envio> {
    // const url = environment.apiUrl + '/embarques/envios';
    const endpoint = `embarques/envios/${id}`;
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.get<Envio>(url);
  }

  updateEnvio(envio) {
    console.log('Actualizando envio: ', envio);
    const target = { ...envio };
    console.log('*****************');
    console.log(target);
    console.log('*****************');
    delete target.dateCreated;
    delete target.lastUpdated;
    const endpoint = `embarques/envios/${target.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.put(url, target);
  }

  cerrarEnvio(envio, auth) {
    console.log('Cerrando el envio: ', envio);
    console.log('Autorizacion', auth);
    const endpoint = `embarques/envios/cerrarEnvio/${envio.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.put(url, auth);
  }

  asignarFacturas(embarque, condiciones) {
    const data = {
      embarque: embarque.id,
      condiciones: condiciones
    };
    const url = `${this.apiUrl}/asignarFacturas`;
    return this.http.put(url, data);
  }
}
