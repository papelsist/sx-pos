import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';


import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class SolicitudesService {

  // readonly apiUrl = environment.apiUrl + '/inventario/sols';

  private apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/sols');
  }

  get(id: string): Observable<SolicitudDeTraslado> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SolicitudDeTraslado>(url)
  }

  list(documento: number = 0 ): Observable<SolicitudDeTraslado[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento > 0) {
      params =  params.set('documento', documento.toString());
    }
    return this.http.get<SolicitudDeTraslado[]>(this.apiUrl, {params: params})
  }

  porAtender(documento: number = 0 ) {
    let params = new HttpParams()
      .set('sucursalAtiende', this.sucursal.id)
      .set('porAtender','porAtender');
    if (documento) {
      params =  params.set('documento', documento.toString());
    }
    return this.http.get<SolicitudDeTraslado[]>(this.apiUrl, {params: params})
  }

  pendientes(): Observable<SolicitudDeTraslado[]> {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
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

  atender(sol: SolicitudDeTraslado, chofer, comentario: string) {
    // sol.atender = new Date().toISOString()
    let params = new HttpParams()
    .set('chofer_id', chofer.id)
    .set('comentario',comentario);
    const url = `${this.apiUrl}/atender/${sol.id}`;
    return this.http.put(url, sol, { params: params});
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

  choferes(): Observable<Array<any>> {
    // const url = environment.apiUrl + '/embarques/choferes';
    const url = this.configService.buildApiUrl('embarques/choferes')
    return this.http.get<Array<any>>(url);
  }

}
