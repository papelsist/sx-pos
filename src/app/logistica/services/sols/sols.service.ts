import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class SolsService {

  private apiUrl: string;

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
  {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/sols');
  }

  get(id: string): Observable<SolicitudDeTraslado> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SolicitudDeTraslado>(url)
  }

  peidnetesDeAtender(documento?: string ) {
    let params = new HttpParams().set('sucursalAtiende', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<SolicitudDeTraslado[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<SolicitudDeTraslado[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<SolicitudDeTraslado[]>(this.apiUrl, {params: params})
  }

  save(sol: SolicitudDeTraslado) {
    return this.http.post(this.apiUrl, sol);
  }

  update(sol: SolicitudDeTraslado) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  inventariar(dev: SolicitudDeTraslado) {
    const url = `${this.apiUrl}/${dev.id}`;
    return this.http.put(url, dev, {
      params: new HttpParams().set('inventariar', 'inventariar')
    });
  }

  buscarSolicitudPendiente( filtro: {sucursal: string; documento: string} ): Observable<SolicitudDeTraslado> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/buscarSolicitudPendiente`;
    return this.http.get<SolicitudDeTraslado>(url, {params: params})
  }

}
