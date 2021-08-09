import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { CorteCobranza } from 'app/caja/models/corteCobranza';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';



@Injectable()
export class CorteCobranzaService {

  private apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('tesoreria/corteCobranza');
  }

  get(id: string): Observable<CorteCobranza> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CorteCobranza>(url)
  }

  list(fecha: Date): Observable<CorteCobranza[]> {
    const params = new HttpParams()
      .set('sucursal', this.sucursal.id)
      .set('fecha', fecha.toISOString());
      const url = `${this.apiUrl}/cortes`;
    return this.http.get<CorteCobranza[]>(url, {params: params})
  }

  prepararCorte(formaDePago: string, tipo: string, fecha: Date) {
    const params = new HttpParams()
      .set('sucursal', this.sucursal.id)
      .set('formaDePago', formaDePago)
      .set('tipo', tipo)
      .set('fecha', fecha.toISOString())
    const url = `${this.apiUrl}/preparar`;
    return this.http.get<CorteCobranza>(url, {params: params});
  }

  corteChequeInfo(formaDePago: string, tipo: string, fecha: Date) {
    const params = new HttpParams()
      .set('sucursal', this.sucursal.id)
      .set('formaDePago', formaDePago)
      .set('tipo', tipo)
      .set('fecha', fecha.toISOString())
    const url = `${this.apiUrl}/corteChequeInfo`;
    return this.http.get<CorteCobranza>(url, {params: params});
  }

  save(corte: CorteCobranza) {
    corte.sucursal = this.sucursal
    return this.http.post(this.apiUrl, corte);
  }

  update(corte: CorteCobranza) {
    return this.http.put(this.apiUrl+'/'+corte.id, corte);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  cambioDeCheque(cambio: any) {
    cambio.sucursal = this.sucursal
    const url = this.configService.buildApiUrl('cxc/cobro/cambioDeCheque');
    return this.http.post(url, cambio);
  }

}
