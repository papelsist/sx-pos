import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {Sucursal} from 'app/models';
import {SolicitudDeDeposito} from 'app/ventas/models/solicitudDeDeposito';
import * as fromSolicitudes from '../store/reducers';
import { SaveAction } from '../store/actions/solicitudes.actions';


@Component({
  selector: 'sx-solicitud-create',
  template: `
    <ng-template tdLoading [tdLoadingUntil]="!(loading$ | async)" tdLoadingStrategy="overlay">
      <div layout>
        <sx-solicitud-form flex="60" [sucursal]="sucursal$ | async" (save)="onSave($event)" [solicitud]="solicitud$ | async">
        </sx-solicitud-form>
      </div>
    </ng-template>
  `,
  styles: []
})
export class SolicitudEditComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  loading$: Observable<boolean>;
  solicitud$: Observable<SolicitudDeDeposito>;

  constructor(
    private store: Store<fromSolicitudes.State>,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(state => state.config.sucursal);
    this.solicitud$ = this.store.select(fromSolicitudes.getSelected);
    this.loading$ = this.store.select(fromSolicitudes.getLoading);
    // this.solicitud$.subscribe(sol => console.log('Editando sol: ', sol))
  }

  onSave(solicitud: SolicitudDeDeposito) {
    this.store.dispatch(new SaveAction(solicitud));
  }



}
