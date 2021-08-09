import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Morralla } from 'app/caja/models/morralla';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class MorrallaService {

  private apiUrl: string;

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('tesoreria/morralla');
  }

  get(id: string): Observable<Morralla> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Morralla>(url)
  }

  list(): Observable<Morralla[]> {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Morralla[]>(this.apiUrl, {params: params})
  }

  save(corte: Morralla) {
    corte.sucursal = this.sucursal
    return this.http.post(this.apiUrl, corte);
  }

  update(corte: Morralla) {
    const url = `${this.apiUrl}/${corte.id}`;
    return this.http.put(url, corte);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}

