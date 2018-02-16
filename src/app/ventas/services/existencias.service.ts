import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Existencia, Producto, Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class ExistenciasService {

  private apiUrl: string;  // = environment.apiUrl + '/existencias';

  constructor(
    private http: HttpClient, private config: ConfigService
  ) { 
    this.apiUrl = config.buildApiUrl('existencias');
  }

  buscarExistencias(producto: Producto, fecha: Date = new Date()) {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const url = `${this.apiUrl}/${producto.id}/${year}/${month}`;
    // console.log(`Buscando existencias del producto ${producto.clave} para el ${month} - ${year}`);
    // console.log('URL: ', url);
    return this.http.get<Existencia[]>(url);
  }

  reporteDeDiscrepancias() {
    const url = `${this.apiUrl}/reporteDeDiscrepancias`;
    const params = new HttpParams()
      .set('SUCURSAL', this.config.getCurrentSucursal().id);
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



