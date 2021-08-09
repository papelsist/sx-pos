import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { DevolucionDeCompra } from 'app/logistica/models/devolucionDeCompra';
import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class DecsService {

  private apiUrl: string //= environment.apiUrl + '/inventario/decs';

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
  {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/decs');
  }

  get(id: string): Observable<DevolucionDeCompra> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<DevolucionDeCompra>(url)
  }

  list(documento?: string ): Observable<DevolucionDeCompra[]> {
    let params = new HttpParams().set('sucursal',this.sucursal.id);
    if(documento){
      params =  params.set('documento', documento);
    }
    return this.http.get<DevolucionDeCompra[]>(this.apiUrl, {params: params})
  }
  
  save(devolucion: DevolucionDeCompra) {
    return this.http.post(this.apiUrl, devolucion);
  }

  update(devolucion: DevolucionDeCompra) {
    return this.http.put(this.apiUrl+'/'+devolucion.id, devolucion);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  inventariar(dev: DevolucionDeCompra) {
    const url = `${this.apiUrl}/${dev.id}`;
    return this.http.put(url, dev, {
      params: new HttpParams().set('inventariar','inventariar')
    });
  }

  buscarCom( filtro: {sucursal: string; tipo: string, documento: string, fecha?: string} ): Observable<RecepcionDeCompra>{
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    const url = `${this.apiUrl}/buscarCom`;
    return this.http.get<RecepcionDeCompra>(url, {params: params})
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
