import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as Sectores from '../actions/solicitudes.actions';
import { SolicitudesService } from 'app/ventas/solicitudes/services/solicitudes.service';


@Injectable()
export class SolicitudesEffects {

  @Effect() loadPendientes$ = this.actions$
    .ofType<Sectores.LoadPendientesAction>(Sectores.LOAD_PENDIENTES)
    .switchMap( () =>
      this.service.pendientes()
        .map(sols => new Sectores.LoadPendientesSuccessAction(sols))
        .catch(error => Observable.of(new Sectores.SearchError(error)))
    );

  @Effect() save$ = this.actions$
    .ofType<Sectores.SaveAction>(Sectores.SAVE)
    .map( action => action.payload)
    .switchMap( sol => {
      if (sol.id === null) {
        return this.service.save(sol)
          .map(res => new Sectores.SaveSuccess(res))
          .catch(error => Observable.of(new Sectores.SaveError(error)));
      } else {
        return this.service.update(sol)
          .map(res => new Sectores.SaveSuccess(res))
          // .catch(error => {})
          .catch(error => {
            console.log('Error al persistir:', error);
            return Observable.of(new Sectores.SaveError(error));
          });
      }
    });

  @Effect({dispatch: false}) saveSuccess$ = this.actions$
    .ofType<Sectores.SaveSuccess>(Sectores.SAVE_SUCCESS)
    .map( action => action.payload)
    .do(sol => {
      console.log('Sol generada: ', sol);
      this.router.navigate(['/ventas/pedidos/solicitudes']);
    });

  @Effect() select$ = this.actions$.ofType<Sectores.SelectAction>(Sectores.SELECT)
    .map( action => action.payload)
    .switchMap(id =>
      this.service.get(id))
    .map(sol => new Sectores.SelectSuccessAction(sol))
    .catch(error => Observable.of(new Sectores.SelectErrorAction(error))
    );


  @Effect()
  navigateToEdit = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/ventas/pedidos/solicitudes/edit/'))
    .map(r => _.replace(r, '/ventas/pedidos/solicitudes/edit/', ''))
    // .do(route => console.log('Edit sector id: ', route))
    .switchMap( id => Observable.of(new Sectores.SelectAction(id)));


  @Effect()
  delete$ = this.actions$.ofType<Sectores.DeleteAction>(Sectores.DELETE)
    .map(action => action.payload)
    // .do( value => console.log('Eliminando sector:', value))
    .switchMap(id =>
      this.service.delete(id))
    .map(dev => new Sectores.DeleteSuccessAction())
    .catch(error => Observable.of(new Sectores.DeleteErrorAction(error))
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: SolicitudesService
  ) {}
}
