import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Venta, Sucursal, Producto, Cliente } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/reducers';
import { User } from 'app/_auth/models/user';

@Injectable()
export class PedidosService {
  apiUrl: string;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private configService: ConfigService
  ) {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = `${configService.getApiUrl()}/ventas`;
  }

  get(id: string): Observable<Venta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Venta>(url);
  }

  pendientes(term): Observable<Venta[]> {
    let params = new HttpParams();
    if (term) {
      params = params.set('term', term);
    }
    const url = `${this.apiUrl}/pendientes/${this.sucursal.id}`;
    return this.http.get<Venta[]>(url, { params: params });
  }

  list(): Observable<Venta[]> {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Venta[]>(this.apiUrl, { params: params });
  }

  save(venta: Venta) {
    return this.http.post(this.apiUrl, venta);
  }

  update(venta: Venta) {
    const url = `${this.apiUrl}/${venta.id}`;
    return this.http.put(url, venta);
  }

  asignarEnvio(venta: Venta, direccion: {}) {
    console.log('Asignando direccion de envio: ', direccion);
    const url = `${this.apiUrl}/asignarEnvio/${venta.id}`;
    return this.http.put(url, direccion);
  }

  cancelarEnvio(venta: Venta) {
    console.log('Cancleando envio de: ', venta);
    const url = `${this.apiUrl}/cancelarEnvio/${venta.id}`;
    return this.http.put(url, {});
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  findManiobraFlete(): Observable<Producto> {
    const params = new HttpParams().set('clave', 'MANIOBRAF');
    const url = `${this.apiUrl}/findManiobra`;
    return this.http.get<Producto>(url, { params: params });
  }

  findManiobra(): Observable<Producto> {
    const params = new HttpParams().set('clave', 'MANIOBRA');
    const url = `${this.apiUrl}/findManiobra`;
    return this.http.get<Producto>(url, { params: params });
  }

  findCorte(): Observable<Producto> {
    const params = new HttpParams().set('clave', 'CORTE');
    const url = `${this.apiUrl}/findManiobra`;
    return this.http.get<Producto>(url, { params: params });
  }

  mandarFacturar(venta: Venta) {
    const url = `${this.apiUrl}/mandarFacturar/${venta.id}`;
    return this.http.put(url, {});
  }

  mandarFacturarConAutorizacion(autorizacion: any) {
    const url = `${this.apiUrl}/mandarFacturarConAutorizacion`;
    return this.http.post(url, autorizacion);
  }

  generarValeAutomatico(venta: Venta) {
    const url = `${this.apiUrl}/generarValeAutomatico/${venta.id}`;
    return this.http.put(url, {});
  }

  pendientesDeFacturar(tipo: string) {
    const params = new HttpParams()
      .set('facturables', tipo)
      .set('sucursal', this.sucursal.id);
    return this.http.get<Venta[]>(this.apiUrl, { params: params });
  }

  facturados(term = '') {
    const params = new HttpParams().set('term', term);
    const url = `${this.apiUrl}/facturados/${this.sucursal.id}`;
    return this.http.get<Venta[]>(url, { params: params });
  }

  canceladas(term?) {
    let params = new HttpParams();
    // .set('sucursal', this.sucursal.id);
    if (term) {
      params = params.set('term', term);
    }
    // const url = this.configService.buildApiUrl('cxc/canceladas');
    const url = `${this.configService.getApiUrl()}/cxc/canceladas/${
      this.sucursal.id
    }`;
    // http://localhost:9090/siipapx/api/cxc/canceladas?term=
    // http://localhost:9090/siipapx/api/ventas/facturados/402880fc5e4ec411015e4ec64e70012e?term=
    return this.http.get<Venta[]>(url, { params: params });
  }

  facturar(venta: Venta) {
    const url = `${this.apiUrl}/facturar/${venta.id}`;
    return this.http.put(url, {});
  }

  print(id: string) {
    const url = `${this.apiUrl}/print`;
    const params = new HttpParams().set('ID', id);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }

  cancelar(factura: Venta, user: User, motivo: string): Observable<Venta> {
    console.log('Cancelando en el sistema la factura: ', factura);
    const params = new HttpParams()
      .set('usuario', user.username)
      .set('motivo', motivo);
    const url = `${this.apiUrl}/cancelar/${factura.id}`;
    return this.http.put<Venta>(url, {}, { params: params });
  }

  timbrar(venta: Venta): Observable<Venta> {
    const url = `${this.apiUrl}/timbrar/${venta.id}`;
    return this.http.put<Venta>(url, {});
  }

  cambioDeCliente(
    venta: Venta,
    usuario: User,
    cliente: Cliente
  ): Observable<Venta> {
    const url = `${this.apiUrl}/cambioDeCliente/${venta.id}`;
    const params = new HttpParams()
      .set('usuario', usuario.username)
      .set('cliente', cliente.id);
    return this.http.put<Venta>(url, {}, { params: params });
  }

  mostrarXml(venta: Venta): Observable<any> {
    const endpoint = `cfdis/mostrarXml/${venta.cuentaPorCobrar.cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  imprimirCfdi(cfdi: any) {
    const endpoint = `cfdis/print/${cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  imprimirPedido(pedidoId: string) {
    const url = `${this.apiUrl}/print/${pedidoId}`;
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  clientesNuevos(fecha: Date) {
    const url = this.configService.buildApiUrl('report/clientesNuevos');
    const params = new HttpParams().set('fecha', fecha.toISOString());
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob',
      params: params
    });
  }

  actualizarCfdiEmail(cliente: Cliente, email: string) {
    const endpoint = `clientes/actualizarCfdiMail/${cliente.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const params = new HttpParams().set('email', email);
    return this.http.put(url, {}, { params: params });
  }

  buscarPreciosPorCliente(
    cliente: Cliente,
    producto: Producto
  ): Observable<any> {
    const url = this.configService.buildApiUrl(
      'preciosPorCliente/buscarPrecio'
    );
    // const url = this.configService.buildApiUrl('preciosPorCliente/buscarPrecio')
    const params = new HttpParams()
      .set('cliente', cliente.id)
      .set('producto', producto.id);
    return this.http.get<any>(url, { params: params });
  }

  preciosPorCliente(cliente: Cliente) {
    const url = this.configService.buildApiUrl(
      'preciosPorCliente/preciosPorCliente'
    );
    const params = new HttpParams().set('cliente', cliente.id);
    return this.http.get<any>(url, { params: params });
  }

  descuentosPorVolumen(): Observable<any> {
    const url = this.configService.buildApiUrl('descuentoPorVolumen');
    return this.http.get<any>(url);
  }

  enviarPorEmail(venta: Venta, target: string): Observable<Venta> {
    const endpoint = `cfdis/enviarFacturaEmail`;
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.put<Venta>(url, { factura: venta.id, target: target });
  }
}
