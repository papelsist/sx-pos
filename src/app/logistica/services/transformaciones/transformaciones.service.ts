import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Transformacion } from "app/logistica/models/transformacion";
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class TransformacionesService {

  private apiUrl: string;

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
  {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/transformaciones');
  }

  get(id: string): Observable<Transformacion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Transformacion>(url)
    .shareReplay();
  }

  list(term: string = ''): Observable<Transformacion[]> {
    const params = new HttpParams()
    .set('sucursal', this.sucursal.id)
    .set('term', term);
    return this.http.get<Transformacion[]>(this.apiUrl, {params: params})
      .shareReplay();
  }
 
  save(transformacion: Transformacion) {
    transformacion.sucursal = this.sucursal;
    return this.http.post(this.apiUrl, transformacion);
  }

  update(transformacion: Transformacion) {
    return this.http.put(this.apiUrl+'/'+transformacion.id, transformacion);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  inventariar(trs: Transformacion) {
    const url = `${this.apiUrl}/${trs.id}`;
    return this.http.put(url, trs, {
      params: new HttpParams().set('inventariar','inventariar')
    });
  }

  print(id: string){
    const url = `${this.apiUrl}/print`;
    let params = new HttpParams()
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

}
