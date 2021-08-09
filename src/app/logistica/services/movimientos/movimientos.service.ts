import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Movimiento } from '@siipapx/logistica/models/movimiento';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';
import { VentaDet } from '@siipapx/models';

@Injectable()
export class MovimientosService {
  private apiUrl: string;

  sucursal: Sucursal;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/movimientos');
  }

  list(term = null, comentario = null): Observable<Movimiento[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (term) {
      params = params.set('term', term);
    }
    return this.http.get<Movimiento[]>(this.apiUrl, { params: params });
  }

  save(movimiento: Movimiento) {
    movimiento.sucursal = this.sucursal;
    return this.http.post(this.apiUrl, movimiento);
  }

  update(movimiento: Movimiento) {
    movimiento.partidas.forEach(item => {
      item.producto = item.producto.id;
    });
    return this.http.put(this.apiUrl + '/' + movimiento.id, movimiento);
  }

  get(id: string): Observable<Movimiento> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<Movimiento>(url).shareReplay();
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  inventariar(mov: Movimiento) {
    const url = `${this.apiUrl}/${mov.id}`;
    return this.http.put(url, mov, {
      params: new HttpParams().set('inventariar', 'inventariar')
    });
  }

  print(id: string) {
    const url = `${this.apiUrl}/print`;
    const params = new HttpParams().set('ID', id);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }

  reporteDeDiscrepancias(reportParams: {}) {
    const url = this.configService.buildApiUrl(
      `existencias/reporteDeDiscrepancias`
    );
    reportParams['SUCURSAL'] = this.configService.getCurrentSucursal().id;
    console.log(`Params: `, reportParams);
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
}
