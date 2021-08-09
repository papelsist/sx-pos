import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { Inventario } from 'app/logistica/models/inventario';
import { ConfigService } from 'app/core/services/config.service';
import { Sucursal } from 'app/models';

@Injectable()
export class KardexService {

  readonly apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario');
  }

  list(producto?: string ): Observable<Inventario[]> {
    let params = new HttpParams().set('sucursal',this.sucursal.id);
    if(producto){
      params =  params.set('term', producto);
    }
    return this.http.get<Inventario[]>(this.apiUrl, {params: params})
  }

  buscar( filtro: any ): Observable<Inventario>{
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    const url = `${this.apiUrl}/find`;
    return this.http.get<Inventario>(url, {params: params})
  }

  recalcular(producto: any){
    let params = new HttpParams();
    if (producto) {
      params = params.set('producto', producto.id);
    }
    const url = `${this.apiUrl}/recalcular`;
    return this.http.get(url, {params: params})
  }

  print(reportParams: any) {
    const url = `${this.apiUrl}/printKardex`;
    /*
    const params = new HttpParams()
      .set('FECHA_INI', reportParams.fechaInicial)
      .set('FECHA_FIN', reportParams.fechaFinal)
      .set('CLAVE', reportParams.producto.clave)
      .set('SUCURSAL', this.sucursal.id);
      */
      const params = new HttpParams()
      .set('fechaInicial', reportParams.fechaInicial)
      .set('fechaFinal', reportParams.fechaFinal)
      .set('producto', reportParams.producto.id)
      .set('sucursal', this.sucursal.id);

    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

  getLineas(): Observable<any> {
    const url = this.configService.buildApiUrl('lineas');
    return this.http.get<Observable<any>>(url);
  }
  getClases(): Observable<any> {
    const url = this.configService.buildApiUrl('clases');
    return this.http.get<Observable<any>>(url);
  }

}
