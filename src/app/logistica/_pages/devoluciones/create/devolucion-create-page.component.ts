import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';

import { DevolucionDeVenta } from "app/logistica/models/devolucionDeVenta";
import { Sucursal } from 'app/models';

import { DevolucionesService } from "app/logistica/services/devoluciones/devoluciones.service";
import * as fromRoot from 'app/reducers';


@Component({
  selector: 'sx-devolucion-create-page',
  template: `
    <div layout layout-align="center stretch">
      <sx-devolucion-form flex="80" [sucursal]="sucursal$ | async" (save)="onSave($event)"></sx-devolucion-form>
    </div>
  `,
  styles: ['']
})
export class DevolucionCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor(
    private service: DevolucionesService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    // Temporal mientras la obtenemos del ConfigState
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  onSave(dev: DevolucionDeVenta) {
    console.log('Salvando devolucion de vanta: ', dev)
    this.service
      .save(dev)
      .subscribe( 
        (rmd) => {
          console.log('RMD salvado: ', rmd);
          this.router.navigate(['/logistica/inventarios/devoluciones'])
        },
        response => {
          console.log('An HTTP Error: ', response);
        }
      );
  }

}
