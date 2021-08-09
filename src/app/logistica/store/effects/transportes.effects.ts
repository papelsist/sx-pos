import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as Transportes from '../actions/transportes.actions';
import { TransportesService } from 'app/logistica/services/transportes/transportes.service';





@Injectable()
export class TransportesEffects {

  @Effect() load$ = this.actions$
    .ofType<Transportes.SearchAction>(Transportes.SEARCH)
    .map(action => action.payload)
    .switchMap( () =>
      this.service.list()
        .map(sols => new Transportes.SearchSuccessAction(sols))
        .catch(error => Observable.of(new Transportes.SearchError(error)))
    );

  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/embarques/transportes/show/'))
    .map(r => _.replace(r, '/logistica/embarques/transportes/show/', ''))
    .switchMap( id => Observable.of(new Transportes.SelectAction(id)));
  

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: TransportesService
  ) {}
}
