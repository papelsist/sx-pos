import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as Conteos from '../actions/conteos.actions';
import {ConteosService} from 'app/logistica/services/conteos/conteos.service';



@Injectable()
export class ConteosEffects {

  @Effect() load$ = this.actions$
    .ofType<Conteos.SearchAction>(Conteos.SEARCH)
    .map(action => action.payload)
    .switchMap( filter =>
      this.service.list(filter)
        .map(sols => new Conteos.SearchSuccessAction(sols))
        .catch(error => Observable.of({type: 'HTTP_ERROR', payload: error}))
    );

  @Effect() select$ = this.actions$.ofType<Conteos.SelectAction>(Conteos.SELECT)
    .map( action => action.payload)
    .switchMap(id =>
      this.service.get(id))
    .map(sol => new Conteos.SelectSuccessAction(sol))
    .catch(error => Observable.of(new Conteos.SelectErrorAction(error))
    );


  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/almacen/conteo/show/'))
    .map(r => _.replace(r, '/logistica/almacen/conteo/show/', ''))
    // .do(route => console.log('Show SOL id: ', route))
    .switchMap( id => Observable.of(new Conteos.SelectAction(id)));

  @Effect()
  navigateToEdit = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/almacen/conteo/edit/'))
    .map(r => _.replace(r, '/logistica/almacen/conteo/edit/', ''))
    // .do(route => console.log('Edit sector id: ', route))
    .switchMap( id => Observable.of(new Conteos.SelectAction(id)));

  @Effect()
  navigateToCapturaEdit = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/almacen/captura/edit/'))
    .map(r => _.replace(r, '/logistica/almacen/captura/edit/', ''))
    // .do(route => console.log('Edit sector id: ', route))
    .switchMap( id => Observable.of(new Conteos.SelectAction(id)));

  @Effect()
  navigateToCapturaShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/almacen/captura/show/'))
    .map(r => _.replace(r, '/logistica/almacen/captura/show/', ''))
    // .do(route => console.log('Edit sector id: ', route))
    .switchMap( id => Observable.of(new Conteos.SelectAction(id)));


  @Effect()
  delete$ = this.actions$.ofType<Conteos.DeleteAction>(Conteos.DELETE)
    .map(action => action.payload)
    .do( value => console.log('Eliminando conteo:', value))
    .switchMap(id =>
      this.service.delete(id))
    .map(dev => new Conteos.DeleteSuccessAction())
    .catch(error => Observable.of(new Conteos.DeleteErrorAction(error))
    );

    @Effect() generarConteo$ = this.actions$
    .ofType<Conteos.SearchAction>(Conteos.GENERAR_CONTEO)
    .switchMap( filter =>
      this.service.generarConteo()
        .map(res => {
          console.log('Conteos exitosamente generados: ', res);
          return new Conteos.GenerarConteoSuccessAction(res);
        })
        .catch(error => {
          console.log('Error al generar conteo: ', error);
         return Observable.of(new Conteos.GenerarConteoSuccessError(error));
        })
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: ConteosService
  ) {}
}
