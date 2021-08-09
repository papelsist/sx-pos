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
  selector: 'sx-pedido-anticipo-edit',
  template: `
    <div layout layout-align="center center">
      <div flex="60">
        <sx-anticipo-form
          *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'"
          (addNewCliente)="onAddNewCliente()" (save)="onUpdate($event)"
          [sucursal]="sucursal$ | async" [pedido]="pedido$ | async">
        </sx-anticipo-form>
      </div>
    </div>
  `
})
export class PedidoAnticipoEditComponent implements OnInit {

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
          console.log('Anticipo actualizado: ', res);
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


