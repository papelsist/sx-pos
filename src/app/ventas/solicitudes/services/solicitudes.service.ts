import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SolicitudDeDeposito } from 'app/ventas/models/solicitudDeDeposito';
import { Sucursal } from 'app/models';
import { ConfigService } from '@siipapx/core/services/config.service';
import { Params } from '@angular/router';

@Injectable()
export class SolicitudesService {
  private apiUrl: string; // = environment.apiUrl + '/tesoreria/solicitudes';
  sucursal: Sucursal;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('tesoreria/solicitudes');
  }

  get(id: string): Observable<SolicitudDeDeposito> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SolicitudDeDeposito>(url);
  }

  pendientes() {
    const params = new HttpParams()
      .set('sucursal', this.sucursal.id)
      .set('pendientes', 'pendientes');
    const url = `${this.apiUrl}`;
    return this.http.get<SolicitudDeDeposito[]>(url, { params: params });
  }

  list(
    documento?: string,
    autorizadas?: boolean
  ): Observable<SolicitudDeDeposito[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params = params.set('documento', documento);
    }
    if (autorizadas) {
      params = params.set('autorizadas', 'true');
      // params = params.set('pendientes', 'false');
    } else {
      // params = params.set('autorizadas', 'false');
      params = params.set('pendientes', 'true');
    }
    return this.http.get<SolicitudDeDeposito[]>(this.apiUrl, {
      params: params
    });
  }

  save(sol: SolicitudDeDeposito): Observable<SolicitudDeDeposito> {
    return this.http.post<SolicitudDeDeposito>(this.apiUrl, sol);
  }

  update(sol: SolicitudDeDeposito): Observable<SolicitudDeDeposito> {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put<SolicitudDeDeposito>(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }


  buscarDupicada(bancoOri, bancoDes, fechaDep, importe)  : Observable<any> 
  {
    const params = new HttpParams()
    .set('bancoOri', bancoOri.id)
    .set('bancoDes', bancoDes.id)
    .set('fechaDep', fechaDep)
    .set('importe', importe);
    const url = `${this.apiUrl}/buscarDuplicada`;
    return this.http.get<any>(url, {params});
  }


}
