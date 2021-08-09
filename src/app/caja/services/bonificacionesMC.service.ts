import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Cobro } from 'app/models/cobro';
import { Cliente, Sucursal } from 'app/models';

import { Store } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class BonificacionesMCService {
  private apiUrl: string;

  sucursal: Sucursal;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('cxc/cobro');
  }

  buscarBonificacionesMC(cliente: Cliente): Observable<any[]> {
    const url = `${this.apiUrl}/buscarBonificacionesMC/${cliente.id}`;
    return this.http.get<any[]>(url);
  }

  generarDisponible(clienteId: string, importe: number): Observable<any> {
    const params = new HttpParams().set('importe', importe.toString());
    const url = `${this.apiUrl}/generarDisponiblesMC/${clienteId}`;
    return this.http.get<any>(url, { params: params });
  }
}
