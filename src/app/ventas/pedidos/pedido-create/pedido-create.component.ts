import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { Router } from '@angular/router';
import { TdDialogService, TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import { Sucursal, Venta } from 'app/models';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { AddNewClienteService } from 'app/clientes/services/add-new-cliente/add-new-cliente.service';
import { PedidoFormComponent } from '../pedido-form/pedido-form.component';



@Component({
  selector: 'sx-pedido-create',
  template: `
    <sx-nav-layout header="Pedidos" modulo="Ventas">
      <div layout="column">
        <sx-pedido-form #formPedido
          *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'"
          (addNewCliente)="onAddNewCliente()"
          (save)="onSave($event)"
          (cambiarCfdiMail)="onCambioDeCfdiMail($event)"
          (cambiarTel)="onCambioDeTel($event)"
          [sucursal]="sucursal$ | async" [pedido]="pedido$ | async">
        </sx-pedido-form>
      </div>
    </sx-nav-layout>
  `
})
export class PedidoCreateComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  pedido$: Observable<Venta>;
  @ViewChild(PedidoFormComponent) formPedido: PedidoFormComponent

  constructor(
    private addNewClienteService: AddNewClienteService,
    private store: Store<fromRoot.State>,
    private service: PedidosService,
    private loadingService: TdLoadingService,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
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
        moneda: 'MXN',
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

  onCambioDeCfdiMail(cliente) {
    if (cliente) {
      this.doCambioDeCfdiMail(cliente);
    }
  }

  doCambioDeCfdiMail(data) {
   //  console.log('Actualizando el CFDI del cliente');
    this._dialogService.openPrompt({
      message: 'Digite el nuevo email para envio del CFDI',
      viewContainerRef: this._viewContainerRef,
      title: 'Cambio de CFDI',
      value: data.cliente.cfdiMail,
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        console.log('Actualizando cfdi Mail: ', newValue);
        this.loadingService.register('saving');
        this.service.actualizarCfdiEmail(data.cliente, newValue, data.usuario.username)
          .subscribe(
            cli => {
              // console.log('correo actualizado: ', data.cliente);
             //  console.log('Usuario: ', data.usuario);
              this.formPedido.form.get('cliente').setValue(cli);
              this.loadingService.resolve('saving');
            },
            error => this.handlePostError(error)
          );
      }
    });
  }

  onCambioDeTel(cliente) {
    if (cliente) {
      this.doCambioDeTel(cliente);
    }
  }

  doCambioDeTel(data) {
    // console.log('Actualizando el Telefono del cliente');
    this._dialogService.openPrompt({
      message: 'Digite el nuevo telefono',
      viewContainerRef: this._viewContainerRef,
      title: 'Actualización Telefono',
      value: '',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        // console.log('Actualizando Telefono: ', newValue);
        this.loadingService.register('saving');
        this.service.actualizarTelefono(data.cliente, newValue, data.usuario.username)
          .subscribe(
            cli => {
              this.formPedido.form.get('cliente').setValue(cli);
              this.loadingService.resolve('saving');
            },
            error => this.handlePostError(error)
          );
      }
    });
  }

  onSave(pedido: Venta) {
    console.log('Salvando pedido: ', pedido);
    this.loadingService.register('saving');
    this.service
      .save(pedido)
      .subscribe(
        (res: any) => {
          console.log('Persistencia exitosa: ', res);
          this.loadingService.resolve('saving');
          this.router.navigate(['/ventas/pedidos/pendientes'])
        },
        response => this.handlePostError(response)
      );
  }

  private handlePostError(response) {
    console.log('Error : ', response);
    this.loadingService.resolve('saving');
  }

}
