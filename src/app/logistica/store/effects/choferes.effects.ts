import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as Choferes from '../actions/choferes.actions';
import { ChoferesService } from 'app/logistica/services/choferes/choferes.service';




@Injectable()
export class ChoferesEffects {

  @Effect() load$ = this.actions$
    .ofType<Choferes.SearchAction>(Choferes.SEARCH)
    .map(action => action.payload)
    .switchMap( () =>
      this.service.list()
        .map(sols => new Choferes.SearchSuccessAction(sols))
        .catch(error => Observable.of(new Choferes.SearchError(error)))
    );

  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/embarques/choferes/show/'))
    .map(r => _.replace(r, '/logistica/embarques/choferes/show/', ''))
    .switchMap( id => Observable.of(new Choferes.SelectAction(id)));
  

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: ChoferesService
  ) {}
}
