import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';

import { SolicitudDeDeposito } from 'app/ventas/models/solicitudDeDeposito';
import * as fromSolicitudes from '../store/reducers';
import { LoadPendientesAction } from '../store/actions/solicitudes.actions';
import { SolicitudesService } from 'app/ventas/solicitudes/services/solicitudes.service';

@Component({
  selector: 'sx-solicitudes-page',
  templateUrl: './solicitudes-page.component.html',
  styles: []
})
export class SolicitudesPageComponent implements OnInit {

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
      // .map( term => _.toInteger(term))
      .distinctUntilChanged()
      .debounceTime(300);

    const obs2 = this.reload$.asObservable().startWith(true);

    this.pendientes$ = Observable.combineLatest(obs1, obs2, (term, reload) => {
      return term ? term : null;
    }).switchMap( documento => this.service
      .list(documento, this.autorizadas)
      .do( () => this.procesando = true)
      .delay(300)
      // .do( data => console.log('Rows: ', data))
      .finally( () => this.procesando = false));
   }

  ngOnInit() {
    // this.pendientes$ = this.store.select(fromSolicitudes.getPendientes);
    this.load();
  }

  load() {
    this.reload$.next(true);
    // this.store.dispatch(new LoadPendientesAction());
    /*
    this.procesando = true;
    this.pendientes$ = this.service.pendientes()
    .delay(2000)
    .finally(() => this.procesando = false);
    */
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
