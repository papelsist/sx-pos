import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Ficha } from 'app/caja/models/ficha';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class FichaService {

  private apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('tesoreria/fichas');
  }

  get(id: string): Observable<Ficha> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Ficha>(url)
  }

  list(fecha: Date): Observable<Ficha[]> {
    const params = new HttpParams()
      .set('sucursal', this.sucursal.id)
      .set('fecha',fecha.toISOString());
    return this.http.get<Ficha[]>(this.apiUrl, {params: params})
  }

  save(ficha: Ficha) {
    ficha.sucursal = this.sucursal
    return this.http.post(this.apiUrl, ficha);
  }

  update(ficha: Ficha) {
    const url = `${this.apiUrl}/${ficha.id}`;
    return this.http.put(url, ficha);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}

