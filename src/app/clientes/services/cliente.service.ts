import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as _ from 'lodash';

import { Cliente, Sucursal } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class ClienteService {
  private apiUrl: string;

  private sucursal: Sucursal;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('clientes');
    this.sucursal = config.getCurrentSucursal();
  }

  get(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  list(term: string = '%'): Observable<Cliente[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<Cliente[]>(this.apiUrl, { params: params });
  }

  save(com: Cliente) {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.post(this.apiUrl, com, { params: params });
  }

  update(com: Cliente) {
    const url = `${this.apiUrl}/${com.id}`;
    return this.http.put(url, com);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  confirmarCorreo(
    clienteId: string,
    email: string,
    usuario: string
  ): Observable<Cliente> {
    const params = new HttpParams()
      .set('sucursal', this.sucursal.id)
      .set('email', email)
      .set('usuario', usuario);
    const url = `${this.apiUrl}/actualizarCfdiMail/${clienteId}`;
    return this.http.put<Cliente>(url, {}, { params: params });
  }

  validarRfc(rfc: string): Observable<Cliente> {
    const params = new HttpParams().set('rfc', rfc);
    const url = `${this.apiUrl}/validarRfc`;
    return this.http.get<Cliente>(url, { params: params });
  }
}
