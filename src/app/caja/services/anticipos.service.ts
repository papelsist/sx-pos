import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { Cobro } from 'app/models/cobro';
import { Cliente, Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';
import { Periodo } from '@siipapx/models/periodo';

@Injectable()
export class AnticiposService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cxc/anticipos');
  }

  get(id: string): Observable<Cobro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cobro>(url);
  }
  list(filter: any): Observable<Cobro[]> {
    let params = new HttpParams();
    _.forIn(filter, (value, key) => {
      if (value instanceof Periodo) {
        const periodo = value as Periodo;
        params = params.set('fechaInicial', periodo.fechaInicial.toISOString());
        params = params.set('fechaFinal', periodo.fechaFinal.toISOString());
      } else {
        params = params.set(key, value);
      }
    });
    return this.http.get<Cobro[]>(this.apiUrl, { params: params });
  }

  save(sol: Cobro): Observable<Cobro> {
    return this.http.post<Cobro>(this.apiUrl, sol);
  }

  update(sol: Cobro) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  print(id: string) {
    const url = `${this.apiUrl}/print`;
    const params = new HttpParams().set('ID', id);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }
}
