import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Venta, Sucursal, Producto, Banco } from 'app/models';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { ConfigService } from 'app/core/services/config.service';
import { User } from 'app/_auth/models/user';

@Injectable()
export class CajaService {
  private apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private configService: ConfigService
  ) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('ventas');
  }

  /*
  pendientesDeFacturar(tipo: string) {
    const params = new HttpParams()
      .set('facturables', tipo)
      .set('sucursal', this.sucursal.id);
    return this.http.get<Venta[]>(this.apiUrl, {params: params})
  }
  */

  pendientesDeFacturar(tipo: string) {
    const endpoint = `cxc/cobro/ventasFacturables`;
    const url = this.configService.buildApiUrl(endpoint);
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('sucursal', this.sucursal.id);
    return this.http.get<Venta[]>(url, { params: params });
  }

  cobradas(term: string) {
    const params = new HttpParams().set('term', term);
    const url = `${this.apiUrl}/cobradas/${this.sucursal.id}`;
    return this.http.get<Venta[]>(url, { params: params });
  }

  getVenta(id: string): Observable<Venta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Venta>(url);
  }

  facturar(venta: Venta): Observable<Venta> {
    const url = `${this.apiUrl}/facturar/${venta.id}`;
    return this.http.put<Venta>(url, venta);
  }

  facturasPendientesCod() {
    const endpoint = `cuentasPorCobrar/pendientesCod/${this.sucursal.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.get(url);
  }

  cuentaPorCobrar(id: string) {
    const endpoint = `cuentasPorCobrar/${id}`;
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.get(url);
  }

  cobroContado(cobro) {
    const endpoint = `cxc/cobro/cobroContado/`;
    const url = this.configService.buildApiUrl(endpoint);
    const cob = {
      ...cobro,
      venta: cobro.venta.id,
    };
    return this.http.post(url, cob);
  }

  regresarAPedidos(venta: Venta): Observable<Venta> {
    // venta.facturar = null;
    const url = `${this.apiUrl}/regresaraPendiente/${venta.id}`;
    // return this.http.put<Venta>(url, venta);
    return this.http.put<Venta>(url, { facturar: null });
  }

  bancos(): Observable<Banco[]> {
    const endpoint = 'tesoreria/bancos';
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.get<Banco[]>(url);
  }

  timbrar(venta: Venta): Observable<Venta> {
    const url = `${this.apiUrl}/timbrar/${venta.id}`;
    return this.http.put<Venta>(url, venta);
  }

  cancelar(factura: Venta, user: User, motivo: string): Observable<Venta> {
    // Fix para simplificar audig_log
    factura.cliente = {
      id: factura.cliente.id,
    };
    console.log('Cancelando en el sistema la factura: ', factura);
    const params = new HttpParams()
      .set('usuario', user.username)
      .set('motivo', motivo);
    const url = `${this.apiUrl}/cancelar/${factura.id}`;
    return this.http.put<Venta>(url, factura, { params: params });
  }

  mostrarXml(venta: Venta): Observable<any> {
    const endpoint = `cfdis/mostrarXml/${venta.cuentaPorCobrar.cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    // return this.http.get(url)
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob',
    });
  }

  imprimirCfdi(cfdi: any) {
    const endpoint = `cfdis/print/${cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob',
    });
  }

  imprimirRemision(cfdi: any) {
    const endpoint = `cfdis/printRemision/${cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob',
    });
  }

  enviarPorEmail(venta: Venta, target: string): Observable<Venta> {
    const endpoint = `cfdis/enviarFacturaEmail`;
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.put<Venta>(url, { factura: venta.id, target: target });
  }

  buscarAnticiposDisponibles(clienteId: string) {
    const endpoint = `cxc/cobro/buscarAnticiposDisponibles`;
    const params = new HttpParams().set('id', clienteId);
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.get(url, { params });
  }

  registrarCobroConAnticipo(ventaId: string, anticipoId: string) {
    const endpoint = `cxc/cobro/registrarCobroConAnticipo`;
    const params = new HttpParams()
      .set('anticipoId', anticipoId)
      .set('ventaId', ventaId);
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.post(url, {}, { params });
  }
}
