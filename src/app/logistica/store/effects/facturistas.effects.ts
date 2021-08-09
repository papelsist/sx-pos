import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as Facturistas from '../actions/facturistas.actions';
import { FacturistasService } from 'app/logistica/services/facturistas/facturistas.service';



@Injectable()
export class FacturistasEffects {

  @Effect() load$ = this.actions$
    .ofType<Facturistas.SearchAction>(Facturistas.SEARCH)
    .map(action => action.payload)
    .switchMap( filter =>
      this.service.list(filter)
        .map(sols => new Facturistas.SearchSuccessAction(sols))
        .catch(error => Observable.of(new Facturistas.SearchError(error)))
    );

  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/embarques/facturistas/show/'))
    .map(r => _.replace(r, '/logistica/embarques/facturistas/show/', ''))
    .switchMap( id => Observable.of(new Facturistas.SelectAction(id)));
  

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: FacturistasService
  ) {}
}
