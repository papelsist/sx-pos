import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Chofer } from 'app/logistica/models/chofer';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class ChoferesService {

  private apiUrl: string // = environment.apiUrl + '/embarques/choferes';

  constructor(private http: HttpClient, config: ConfigService) { 
    this.apiUrl = config.buildApiUrl('embarques/choferes');
  }

  get(id: string): Observable<Chofer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Chofer>(url)
  }
  
  list(): Observable<Chofer[]> {
    return this.http.get<Chofer[]>(this.apiUrl)
  }

  search(term: string): Observable<Chofer[]> {
    let params = new HttpParams()
      .set('term', term);
    return this.http.get<Chofer[]>(this.apiUrl, {params: params});
  }

}
