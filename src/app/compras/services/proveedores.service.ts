import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Proveedor } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class ProveedoresService {

  // readonly apiUrl = environment.apiUrl + '/proveedores'; 
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) { 
    this.apiUrl = config.buildApiUrl('proveedores');
  }

  list(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  getProductos(proveedor: Proveedor): Observable<Array<any>> {
    const url = `${this.apiUrl}/${proveedor.id}/productos`;
    return this.http.get<Array<any>>(url);
  }

  get(id: string): Observable<Proveedor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Proveedor>(url);
  }

}
