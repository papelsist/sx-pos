import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Compra, Proveedor, Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class OrdenesService {
  private apiUrl: string;

  sucursal: Sucursal;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('compras');
  }

  buscarPendientes(folio?: string) {
    return this.list({ pendientes: true, folio: folio });
  }

  list(filtro): Observable<Compra[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http.get<Compra[]>(this.apiUrl, { params: params });
  }

  get(id: string): Observable<Compra> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Compra>(url);
  }

  save(compra: Compra) {
    compra.sucursal = this.sucursal;
    compra.folio = 0;
    compra.partidas.forEach(item => (item.sucursal = this.sucursal));
    return this.http.post(this.apiUrl, compra);
  }

  update(compra: Compra) {
    const url = `${this.apiUrl}/${compra.id}`;
    return this.http.put(url, compra);
  }

  recibir(compra: Compra,remision: any,fechaR: Date,comentario: string) {
    const data = {compra: compra.id, remision: remision, fechaR: fechaR.toISOString(),comentario: comentario};
    const url = this.configService.buildApiUrl('compras/recibir/' + compra.id);
    return this.http.put(url, data);
  }

  depurar(compra: Compra, partidas) {
    const data = { compra: compra.id, partidas: partidas.map(item => item.id) };
    const url = this.configService.buildApiUrl('compras/depurar');
    return this.http.put(url, data);
  }

  cerrar(compra: Compra) {
    const url = this.configService.buildApiUrl('compras/cerrar/' + compra.id);
    return this.http.put(url, {});
  }

  buscarProductos(proveedor: Proveedor) {
    let params = new HttpParams().set('activos', 'activos');
    const endpoint = `proveedores/${proveedor.id}/productos`;
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.get<Array<any>>(url, { params: params });
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  print(compra: Compra) {
    //const endpoint = `/print/${compra.id}`;
    const endpoint = `compras/print/${compra.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
