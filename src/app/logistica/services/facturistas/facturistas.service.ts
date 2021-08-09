import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Facturista } from 'app/logistica/models/facturista';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class FacturistasService {

  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('embarques/facturistas');
   }

  get(id: string): Observable<Facturista> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Facturista>(url)
  }
  
  list(documento?: string ): Observable<Facturista[]> {
    return this.http.get<Facturista[]>(this.apiUrl)
  }

}
