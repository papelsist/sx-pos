import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as Sols from '../actions/sols.actions';
import { SolsService } from '../../services/sols/sols.service';


@Injectable()
export class SolsEffects {

  @Effect() load$ = this.actions$
    .ofType<Sols.SearchAction>(Sols.SEARCH)
    .map(action => action.payload)
    .debounceTime(300)
    .distinctUntilChanged()
    .do( value => console.log('Loading sols: ', value))
    .switchMap( filter =>
      this.service.list()
        .map(sols => new Sols.SearchSuccessAction(sols))
        .catch(error => Observable.of({type: 'HTTP_ERROR', payload: error}))
    );

  @Effect() select$ = this.actions$.ofType<Sols.SelectAction>(Sols.SELECT)
    .map( action => action.payload)
    // .do(value => console.log('Selecting dev: ', value))
    .switchMap(id =>
      this.service.get(id))
    .map(sol => new Sols.SelectSuccessAction(sol))
    .catch(error => Observable.of(new Sols.SelectErrorAction(error))
    );


  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/inventarios/traslados/sol/show/'))
    .map(r => _.replace(r, '/logistica/inventarios/traslados/sol/show/', ''))
    .do(route => console.log('Show SOL id: ', route))
    .switchMap( id => Observable.of(new Sols.SelectAction(id)));


  @Effect()
  delete$ = this.actions$.ofType<Sols.DeleteAction>(Sols.DELETE)
    .map(action => action.payload)
    .do( value => console.log('Eliminando sol:', value))
    .switchMap(id =>
      this.service.delete(id))
    .map(dev => new Sols.DeleteSuccessAction())
    .catch(error => Observable.of(new Sols.DeleteErrorAction(error))
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: SolsService
  ) {}
}
