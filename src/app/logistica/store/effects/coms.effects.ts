import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as Coms from '../actions/coms.actions';
import { ComsService } from '../../services/coms/coms.service';


@Injectable()
export class ComsEffects {

  @Effect() load$ = this.actions$
  .ofType<Coms.SearchAction>(Coms.SEARCH)
  .map(action => action.payload)
  .debounceTime(300)
  .distinctUntilChanged()
  .switchMap( filter =>
    this.service.list({})
    .map(coms => new Coms.SearchSuccessAction(coms))
    .catch(error => Observable.of({type: 'HTTP_ERROR', payload: error}))
  );

  @Effect()
  navigateToComs = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
  .map(r => r.payload.routerState.url)
  .delay(300)
  .filter( r => r ==='/logistica/inventarios/coms' )
  .switchMap( r =>
    this.service.list({})
    .map(coms => new Coms.SearchSuccessAction(coms))
    .catch(error => Observable.of(new Coms.SearchError(error)))
  );



  @Effect() select$ = this.actions$.ofType<Coms.SelectAction>(Coms.SELECT)
  .map( action => action.payload)
  .switchMap(id =>
    this.service.get(id))
    .map(com => new Coms.SelectSuccessAction(com))
    .catch(error => Observable.of(new Coms.SelectErrorAction(error))
  );


  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/inventarios/coms/show/'))
    .map(r => _.replace(r, '/logistica/inventarios/coms/show/', ''))
    // .do( url => console.log('NAv to: ', url))
    .switchMap( id => Observable.of(new Coms.SelectAction(id)));


  @Effect()
  delete$ = this.actions$.ofType<Coms.DeleteAction>(Coms.DELETE)
  .map(action => action.payload)
  .do( value => console.log('Eliminando com:', value))
  .switchMap(id =>
    this.service.delete(id))
    .map(dev => new Coms.DeleteSuccessAction())
    .catch(error => Observable.of(new Coms.DeleteErrorAction(error))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: ComsService
  ) {}
}
