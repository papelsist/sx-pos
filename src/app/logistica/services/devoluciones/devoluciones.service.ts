import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { DevolucionDeVenta } from 'app/logistica/models/devolucionDeVenta';
import { Venta } from 'app/models';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class DevolucionesService {

  private apiUrl: string //= environment.apiUrl + '/inventario/devoluciones';

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
  {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/devoluciones');
  }

  get(id: string): Observable<DevolucionDeVenta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DevolucionDeVenta>(url)
  }

  list(filter: any): Observable<DevolucionDeVenta[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (filter.documento) {
      params = params.set('documento', filter.documento)
    }
    return this.http.get<DevolucionDeVenta[]>(this.apiUrl, {params: params})
  }

  save(devolucion: DevolucionDeVenta) {
    return this.http.post(this.apiUrl, devolucion);
  }

  update(devolucion: DevolucionDeVenta) {
    const url = `${this.apiUrl}/${devolucion.id}`;
    return this.http.put(url, devolucion);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  inventariar(dev: DevolucionDeVenta) {
    const url = `${this.apiUrl}/${dev.id}`;
    return this.http.put(url, dev, {
      params: new HttpParams().set('inventariar', 'inventariar')
    });
  }

  buscarVenta( filtro: {sucursal: string; tipo: string, documento: string, fecha?: string} ) {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/buscarVenta`;
    return this.http.get<Venta[]>(url, {params: params})
  }

  print(id: string) {
    const url = `${this.apiUrl}/print`;
    const params = new HttpParams()
      .set('ID', id);
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
