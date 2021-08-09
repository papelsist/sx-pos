import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';


import { Sucursal, Existencia, Producto } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class Existencia2Service {

  private apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient, private config: ConfigService
  ) { 
    this.apiUrl = config.buildApiUrl('existencias');
    this.sucursal = config.getCurrentSucursal()
  }

  get(id: string): Observable<Existencia> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Existencia>(url)
  }

  list(filtro: any = {}): Observable<Existencia[]> {
    let params = new HttpParams()
    .set('sucursal', this.sucursal.id);
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    })
    return this.http.get<Existencia[]>(this.apiUrl, {params: params})
  }

  save(exis: Existencia) {
    return this.http.post(this.apiUrl, exis);
  }

  update(sol: Existencia): Observable<Existencia> {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put<Existencia>(url, sol);
  }
  

  buscarExistenciasRemotas(exis: Existencia): Observable<Existencia[]> {
    const year = exis.anio
    const month = exis.mes
    const url = `${this.apiUrl}/${exis.producto.id}/${year}/${month}`;
    return this.http.get<Existencia[]>(url);
  }

  recortePorDetalle() {
    const url = `${this.apiUrl}/recortePorDetalle`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

}
