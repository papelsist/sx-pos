import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {TdLoadingService} from '@covalent/core';

import * as fromRoot from 'app/reducers';
import {Sucursal, Venta} from 'app/models';
import {PedidosService} from 'app/ventas/pedidos/services/pedidos.service';
import { AddNewClienteService } from 'app/clientes/services/add-new-cliente/add-new-cliente.service';



@Component({
  selector: 'sx-pedido-dolares-edit',
  template: `
    <sx-nav-layout header="Pedido en USD" modulo="Ventas">
      <div layout="column">
        <sx-dolares-form
          *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'"
          (save)="onUpdate($event)"
          [pedido]="pedido$ | async"
          [sucursal]="sucursal$ | async">
        </sx-dolares-form>
      </div>
    </sx-nav-layout>
  `
})
export class PedidoDolaresEditComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  pedido$: Observable<Venta>;

  constructor(
    private addNewClienteService: AddNewClienteService,
    private store: Store<fromRoot.State>,
    private service: PedidosService,
    private loadingService: TdLoadingService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
    this.pedido$ = this.route.paramMap.switchMap( params => this.service.get(params.get('id')));
  }

  onAddNewCliente() {
    this.addNewClienteService.newCliente();
  }

  onUpdate(pedido: Venta) {
    this.loadingService.register('saving');
    this.service
      .update(pedido)
      .subscribe(
        (res: any) => {
          console.log('Actualizacion exitosa: ', res);
          this.loadingService.resolve('saving');
          this.router.navigate(['/ventas/pedidos/pendientes'])
        },
        response => this.handlePostError(response)
      );
  }

  private handlePostError(response) {
    console.log('Error al salvar conteo: ', response);
    this.loadingService.resolve('saving');
  }

}

