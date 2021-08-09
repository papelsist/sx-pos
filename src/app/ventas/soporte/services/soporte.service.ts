import { Injectable } from '@angular/core';
import { SolicitudDeDeposito } from '../../models/solicitudDeDeposito';
import { Sucursal } from '../../../models/sucursal';
import { ConfigService } from '../../../core/services/config.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class SoporteService {

  private apiUrl: string; // = environment.apiUrl + '/tesoreria/solicitudes';
  sucursal: Sucursal;

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('logistica/soporte');
  }

  list(periodo) {

    let params = new HttpParams()
    params = params.set('fechaInicial', periodo.fechaInicial.toISOString());
    params = params.set('fechaFinal', periodo.fechaFinal.toISOString());
    return this.http.get(this.apiUrl, {params: params})
  }

  tipos(modulo) {
    const params = new HttpParams().set('modulo', modulo);
    const urlApi = `${this.apiUrl}/tipos`
    return this.http.get(urlApi, {params: params})
  }

  salvar(obj) {
    const params = new HttpParams()
    console.log(obj);
    const urlApi = `${this.apiUrl}/salvar`
    return this.http.post(urlApi, obj, {params: params})
  }

  /* list(
    documento?: string,
    autorizadas?: boolean
  ): Observable<SolicitudDeDeposito[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params = params.set('documento', documento);
    }
    if (autorizadas) {
      params = params.set('autorizadas', 'true');
      // params = params.set('pendientes', 'false');
    } else {
      // params = params.set('autorizadas', 'false');
      params = params.set('pendientes', 'true');
    }
    return this.http.get<SolicitudDeDeposito[]>(this.apiUrl, {
      params: params
    });
  } */

}
