import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';
import { Compra } from "app/models";
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';



@Injectable()
export class ComsService {

  private apiUrl: string;  // environment.apiUrl + '/compras/recepciones';

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
  {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('compras/recepciones');
  }
  
  get(id: string): Observable<RecepcionDeCompra> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<RecepcionDeCompra>(url)
  }

  list(filter?: any): Observable<RecepcionDeCompra[]> {
    let params = new HttpParams().set('sucursal',this.sucursal.id);
    if (filter.documento) {
      params = params.set('documento', filter.documento);
    }
    if( filter.remision) {
      params = params.set('remision', filter.remisio);
    }
    return this.http.get<RecepcionDeCompra[]>(this.apiUrl, {params: params})
  }
  
  save(com: RecepcionDeCompra) {
    return this.http.post(this.apiUrl, com);
  }

  update(com: RecepcionDeCompra) {
    return this.http.put(this.apiUrl+'/'+com.id, com);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  inventariar(com: RecepcionDeCompra) {
    const url = `${this.apiUrl}/${com.id}`;
    return this.http.put(url, com, {
      params: new HttpParams().set('inventariar','inventariar')
    });
  }

  buscarCompra( filtro: {sucursal: string; documento: string} ){
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    const url = `${this.apiUrl}/buscarCompra`;
    return this.http.get<Compra[]>(url, {params: params})
  }

  print(com: RecepcionDeCompra) {
    const url = `${this.apiUrl}/print/${com.id}`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

}
