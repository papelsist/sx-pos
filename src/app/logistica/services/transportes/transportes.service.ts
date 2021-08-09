import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Transporte } from 'app/logistica/models/transporte';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class TransportesService {

  private apiUrl: string; // = environment.apiUrl + '/';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('embarques/transportes');
   }

  get(id: string): Observable<Transporte> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Transporte>(url)
  }
  
  list(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(this.apiUrl)
  }

}
