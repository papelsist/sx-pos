import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';

import { SolicitudDeDeposito } from 'app/ventas/models/solicitudDeDeposito';
import { SolicitudesService } from 'app/ventas/solicitudes/services/solicitudes.service';

import * as fromSolicitudes from 'app/ventas/solicitudes/store/reducers'

@Component({
  selector: 'sx-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrls: ['./solicitudes-pendientes.component.scss']
})
export class SolicitudesPendientesComponent implements OnInit {

  @Input() user: any;

  pendientes$: Observable<SolicitudDeDeposito[]>;

  procesando = false;

  search$ = new BehaviorSubject<string>('');

  reload$ = new Subject<boolean>();

  private _autorizadas = false;

  constructor(
    private store: Store<fromSolicitudes.State>,
    private service: SolicitudesService
  ) {

    const obs1 = this.search$.asObservable()
      .distinctUntilChanged()
      .debounceTime(300);

    const obs2 = this.reload$.asObservable().startWith(true);

    this.pendientes$ = Observable.combineLatest(obs1, obs2, (term, reload) => {
      return term ? term : this.user;
    }).switchMap( user => this.service
      .list(user, this.autorizadas)
      .do( () => this.procesando = true)
      .delay(300)
      .finally( () => this.procesando = false));
   }

  ngOnInit() {

    this.load();
  }

  load() {
    this.reload$.next(true);
  }

  search(term: string) {
    this.search$.next(term);
  }

  set autorizadas(value: boolean) {
    this._autorizadas = value;
    this.load();
  }

  get autorizadas() {
    return this._autorizadas;
  }

}
