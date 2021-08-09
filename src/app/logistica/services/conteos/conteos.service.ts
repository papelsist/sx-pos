import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
 import * as _ from 'lodash';


import { Conteo } from 'app/logistica/models/conteo';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class ConteosService {

  private apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/conteos');
  }

  get(id: string): Observable<Conteo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Conteo>(url)
  }

  peidnetes(documento?: string ) {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Conteo[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<Conteo[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    //return this.http.get<Conteo[]>(this.apiUrl, {params: params})
    return this.http.get<Conteo[]>(this.apiUrl, {})
  }

  save(sol: Conteo) {
    return this.http.post(this.apiUrl, sol);
  }

  update(sol: Conteo) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  generarConteo() {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    const url = `${this.apiUrl}/generarConteo`;
    return this.http.post(url, {params: params})
  }

  cargarSector(sector) {
    console.log('Cargando sectores service');
    let params = new HttpParams();
    params = params.set('sucursal', this.sucursal.id);
    params = params.set('sector', sector);
    const url = `${this.apiUrl}/cargarSector`;
    return this.http.post(url, {}, {params: params})
  }

  generarExistencias() {
    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/generarExistencias`;
    return this.http.get(url, {params: params})
  }

  generarExistenciaParcial() {
    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/generarExistenciaParcial`;
    return this.http.get(url, {params: params})
  }

  limpiarExistencias() {
    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/limpiarExistencias`;
    return this.http.get(url, {params: params});
  }

  print(conteoId: string) {
    const url = `${this.apiUrl}/print/${conteoId}`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

  imprimirSectoresConteo() {
    const url = `${this.apiUrl}/imprimirSectores`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

  reporteNoCapturados() {
    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/noCapturados`;
    return this.http.get(url, {params: params, responseType: 'blob'})
  }

   reporteValidacion(reportParams = {}) {
    reportParams = {...reportParams, sucursalId: this.sucursal.id}
    const url = `${this.apiUrl}/validacion`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    let params = new HttpParams()
    if (reportParams) {
      _.forIn(reportParams, (value, key) => {
        if (value) {
          params = params.set(key, value.toString());
        }
      });
    }
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

  reporteDiferencia(reportParams = {}) {
    reportParams = {...reportParams, sucursalId: this.sucursal.id}
    const url = `${this.apiUrl}/diferencias`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    let params = new HttpParams()
    if (reportParams) {
      _.forIn(reportParams, (value, key) => {
        if (value) {
          params = params.set(key, value.toString());
        }
      });
    }
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

  fijarConteo() {

    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/fijarConteo`;
    return this.http.post(url, {}, {params: params})
  }

  ajustarConteo() {
    console.log('Ajustando el conteo Service')
    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/ajustarConteo`;
    return this.http.post(url, {}, {params: params})
  }


}
