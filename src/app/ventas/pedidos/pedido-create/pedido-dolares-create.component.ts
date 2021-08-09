import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { Router } from '@angular/router';
import {TdLoadingService} from '@covalent/core';

import * as fromRoot from 'app/reducers';
import { Sucursal, Venta } from 'app/models';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { AddNewClienteService } from 'app/clientes/services/add-new-cliente/add-new-cliente.service';



@Component({
  selector: 'sx-pedido-dolares-create',
  template: `
    <sx-nav-layout header=" Pedido USD" modulo="Ventas">
      <div layout="column">
        <sx-dolares-form
          *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'"
          (addNewCliente)="onAddNewCliente()" (save)="onSave($event)"
          [sucursal]="sucursal$ | async" [pedido]="pedido$ | async">
        </sx-dolares-form>
      </div>
    </sx-nav-layout>
  `
})
export class PedidoDolaresCreateComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  pedido$: Observable<Venta>;

  constructor(
    private addNewClienteService: AddNewClienteService,
    private store: Store<fromRoot.State>,
    private service: PedidosService,
    private loadingService: TdLoadingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
    this.pedido$ = this.sucursal$.map( s => {
      const p: Venta  = {
        id: null,
        sucursal: s,
        fecha: new Date().toISOString(),
        cliente: null,
        tipo: 'CON',
        documento: 0,
        importe: 0,
        descuento: 0,
        descuentoImporte: 0,
        subtotal: 0,
        impuesto: 0,
        impuestoTasa: 0,
        total: 0,
        formaDePago: 'EFECTIVO',
        moneda: 'USD',
        tipoDeCambio: 0,
        kilos: 0,
        partidas: []
      };
      return p;
    })
  }

  onAddNewCliente() {
    this.addNewClienteService.newCliente();
  }

  onSave(pedido: Venta) {
    console.log('Salvando  pedido: ', pedido);
    this.loadingService.register('saving');
    this.service
      .save(pedido)
      .subscribe(
        (res: any) => {
          console.log('Actualizacion exitosa: ', res);
          this.loadingService.resolve('saving');
          this.router.navigate(['/ventas/pedidos/pendientes'])
          // this.router.navigate(['/logistica/almacen/conteo/show', res.id], { queryParams: { tipo: 'show' } })
        },
        response => this.handlePostError(response)
      );
  }

  private handlePostError(response) {
    console.log('Error al salvar conteo: ', response);
    this.loadingService.resolve('saving');
  }

}

