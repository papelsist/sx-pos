import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ComplementosService } from 'app/ventas/pedidos/services/complementos.service';
import { Venta } from 'app/models';

import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { ComplementoIne } from '@siipapx/models/complementoIne';

@Component({
  selector: 'sx-complemento-ine',
  template: `
    <div layout="row">
      <ng-container *ngIf="venta$ | async as venta">
        <sx-complemento-form [venta]="venta" (save)="onSave($event)" (update)="onUpdate($event)"></sx-complemento-form>
      </ng-container>
    <div>
  `
})
export class ComplementoComponent implements OnInit {
  venta$: Observable<Venta>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidosService,
    private complementoService: ComplementosService
  ) {}

  ngOnInit() {
    this.venta$ = this.route.paramMap.switchMap(params =>
      this.pedidoService.get(params.get('id'))
    );
  }

  onSave(event: ComplementoIne) {
    console.log('Salvando complemento: ', event);
    this.complementoService.save(event).subscribe(res => {
      console.log('Complemento salvado: ', res);
      this.router.navigate(['/ventas/pedidos/complementos']);
    });
  }

  onUpdate(event: ComplementoIne) {
    this.complementoService.update(event).subscribe(res => {
      console.log('Actualizando salvado: ', res);
      this.router.navigate(['/ventas/pedidos/complementos']);
    });
  }
}
