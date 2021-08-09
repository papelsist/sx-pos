import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { Producto, Existencia } from "app/models";
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class ProductoService {

  private apiUrl: string //= environment.apiUrl + '/productos';

  constructor(
    private http: HttpClient, private config: ConfigService
  ) { 
    this.apiUrl = this.config.buildApiUrl('productos');
  }

  list(term: string, filter:{ [key:string]: any; } = {}): Observable<Producto[]> {
    let params = new HttpParams()
      .set('term', term);
    if (filter.activos === true) {
      params = params.set('activos','activos')
    } if( filter.deLinea === true) {
      params = params.set('deLinea','deLinea')  
    }
    return this.http.get<Producto[]>(this.apiUrl, {params: params});
  }

  buscarExistencias(producto: Producto, fecha: Date = new Date()) {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const endpoit =  this.config.buildApiUrl('existencias');
    const url = `${endpoit}/${producto.id}/${year}/${month}`;
    
    // console.log(`Buscando existencias del producto ${producto.clave} para el ${month} - ${year}`);
    // console.log('URL: ', url);
    return this.http.get<Existencia[]>(url);
  }
}


