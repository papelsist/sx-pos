import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { Observable } from 'rxjs/Observable'; 
import * as _ from 'lodash';

import * as Devoluciones from '../actions/devoluciones.actions';
import { DevolucionesService } from '../../services/devoluciones/devoluciones.service';


@Injectable()
export class DevolucionesEffects {

  @Effect() search$ = this.actions$
  .ofType<Devoluciones.SearchAction>(Devoluciones.SEARCH)
  .map(action => action.payload)
  .debounceTime(300)
  .distinctUntilChanged()
  .do( value => console.log('Searching devoluciones: ', value))
  .switchMap( filter =>
    this.service.list(filter)
    .map(ordenes => new Devoluciones.SearchSuccessAction(ordenes))
    .catch(error => Observable.of(new Devoluciones.SearchError(error))) 
  );

  
  @Effect()
  navigateToDevoluciones = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
  .map(r => r.payload.routerState.url)
  .delay(300)
  .filter( r => r ==='/logistica/inventarios/devoluciones' )
  // .do(route => console.log('Navegando a devoluciones: ', route))
  .switchMap( r => 
    this.service.list({documento: ''})
    .map(ordenes => new Devoluciones.SearchSuccessAction(ordenes))
    .catch(error => Observable.of(new Devoluciones.SearchError(error))) 
  );
  
  
  @Effect() select$ = this.actions$.ofType<Devoluciones.SelectAction>(Devoluciones.SELECT)
  .map( action => action.payload)
  // .do(value => console.log('Selecting dev: ', value))
  .switchMap(id => 
    this.service.get(id))
    .map(dev => new Devoluciones.SelectSuccessAction(dev))
    .catch(error => Observable.of(new Devoluciones.SelectErrorAction(error))
  );
  
  
  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
  .map(r => r.payload.routerState.url)
  .filter( r => r.startsWith('/logistica/inventarios/devoluciones/show/'))
  .map(r => _.replace(r, '/logistica/inventarios/devoluciones/show/', ''))
  .do(route => console.log('Show devolucion id: ', route))
  .switchMap( id => Observable.of(new Devoluciones.SelectAction(id)));

  
  @Effect()
  delete$ = this.actions$.ofType<Devoluciones.DeleteAction>(Devoluciones.DELETE)
  .map(action => action.payload)
  .do( value => console.log('Eliminando rmd', value))
  .switchMap(id => 
    this.service.delete(id))
    .map(dev => new Devoluciones.DeleteSuccessAction())
    .catch(error => Observable.of(new Devoluciones.DeleteErrorAction(error))
  );
  


  constructor(
    private actions$: Actions,
    private router: Router,
    private service: DevolucionesService
  ) {}
}
