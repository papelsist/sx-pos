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
        <sx-solicitud-form flex="80" [sucursal]="sucursal$ | async" (save)="onSave($event)">
        </sx-solicitud-form>
      </div>
    </ng-template>
  `,
  styles: []
})
export class SolicitudCreateComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromSolicitudes.State>,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(state => state.config.sucursal);
    this.loading$ = this.store.select(fromSolicitudes.getLoading);
  }

  onSave(solicitud: SolicitudDeDeposito) {
    // console.log('Salvando solicitud de deposito: ', solicitud);
    this.store.dispatch(new SaveAction(solicitud));
  }



}
