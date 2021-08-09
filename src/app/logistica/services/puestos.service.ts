import { Injectable } from '@angular/core';
import { VentaDet } from 'app/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../core/services/config.service';
import { Observable } from "rxjs/Observable";
import { Periodo } from 'app/models/periodo';
import * as _ from 'lodash';



@Injectable()
export class PuestosService {

  private apiUrl: string;


  constructor(private http: HttpClient,
    private configService: ConfigService) { 
      this.apiUrl = configService.buildApiUrl('inventario/puestos');
        }

  list(term: string = '',filter: any): Observable<VentaDet[]> {
    console.log(term)
    let params = new HttpParams();
    if (term) {
      params = params.set('term', term);
    }
    _.forIn(filter, (value, key) => {
      if (value instanceof Periodo) {
        const periodo = value as Periodo;
        params = params.set('fechaInicial', periodo.fechaInicial.toISOString());
        params = params.set('fechaFinal', periodo.fechaFinal.toISOString());
      } else {
        params = params.set(key, value);
      }
    });
     return  this.http.get<VentaDet[]>(this.apiUrl, {params: params}).shareReplay();
  }




}
