import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { Observable } from 'rxjs/Observable'; 
import * as _ from 'lodash';

import * as Decs from '../actions/decs.actions';
import { DecsService } from '../../services/decs/decs.service';


@Injectable()
export class DecsEffects {

  @Effect() search$ = this.actions$
  .ofType<Decs.SearchAction>(Decs.SEARCH)
  .map(action => action.payload)
  .debounceTime(300)
  .distinctUntilChanged()
  // .do( value => console.log('Loading decs: ', value))
  .switchMap( filter =>
    this.service.list(filter)
    .map(ordenes => new Decs.SearchSuccessAction(ordenes))
    .catch(error => Observable.of({type: 'HTTP_ERROR', payload: error})) 
  );

  
  @Effect()
  navigateToDecs = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
  .map(r => r.payload.routerState.url)
  .delay(300)
  .filter( r => r ==='/logistica/inventarios/decs' )
  // .do(route => console.log('Navegando a DECS: ', route))
  .switchMap( r => 
    this.service.list()
    .map(decs => new Decs.SearchSuccessAction(decs))
    .catch(error => Observable.of(new Decs.SearchError(error))) 
  );
  
  
  @Effect() select$ = this.actions$.ofType<Decs.SelectAction>(Decs.SELECT)
  .map( action => action.payload)
  // .do(value => console.log('Selecting dev: ', value))
  .switchMap(id => 
    this.service.get(id))
    .map(dev => {
      // console.log('Dev localizado: ', dev);
      return new Decs.SelectSuccessAction(dev)
    })
    .catch(error => Observable.of(new Decs.SelectErrorAction(error))
  );
  
  
  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
  .map(r => r.payload.routerState.url)
  .filter( r => r.startsWith('/logistica/inventarios/decs/show/'))
  .map(r => _.replace(r, '/logistica/inventarios/decs/show/', ''))
  // .do(route => console.log('Show DEC id: ', route))
  .switchMap( id => Observable.of(new Decs.SelectAction(id)));

  
  @Effect()
  delete$ = this.actions$.ofType<Decs.DeleteAction>(Decs.DELETE)
  .map(action => action.payload)
  // .do( value => console.log('Eliminando rmd', value))
  .switchMap(id => 
    this.service.delete(id))
    .map(dev => new Decs.DeleteSuccessAction())
    .catch(error => Observable.of(new Decs.DeleteErrorAction(error))
  );
  


  constructor(
    private actions$: Actions,
    private router: Router,
    private service: DecsService
  ) {}
}
