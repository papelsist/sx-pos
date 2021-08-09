import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { Venta } from 'app/models/venta';
import { ComplementoIne } from 'app/models/complementoIne';

import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class ComplementosService {
  apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${configService.getApiUrl()}/complementosIne`;
  }

  get(id: string): Observable<Venta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Venta>(url);
  }

  pendientes(term): Observable<Venta[]> {
    const params = new HttpParams().set('term', term);
    const url = `${this.apiUrl}/pendientes`;
    return this.http.get<Venta[]>(url, { params: params });
  }

  save(complemento: ComplementoIne) {
    return this.http.post(this.apiUrl, complemento);
  }

  update(complemento: ComplementoIne) {
    const url = `${this.apiUrl}/${complemento.id}`;
    return this.http.put(url, complemento);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
