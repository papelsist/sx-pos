import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as Embarques from '../actions/embarques.actions';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';


@Injectable()
export class EmbarquesEffects {

  @Effect() load$ = this.actions$
    .ofType<Embarques.SearchAction>(Embarques.SEARCH)
    .map(action => action.payload)
    .switchMap( filter =>
      this.service.list(filter)
        .map(sols => new Embarques.SearchSuccessAction(sols))
        .catch(error => Observable.of(new Embarques.SelectErrorAction(error)))
    );

    

  @Effect() select$ = this.actions$.ofType<Embarques.SelectAction>(Embarques.SELECT)
    .map( action => action.payload)
    .switchMap(id =>
      this.service.get(id))
    .map(sol => new Embarques.SelectSuccessAction(sol))
    .catch(error => Observable.of(new Embarques.SelectErrorAction(error))
    );


  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/embarques/embarques/show/'))
    .map(r => _.replace(r, '/logistica/embarques/embarques/show/', ''))
    .switchMap( id => Observable.of(new Embarques.SelectAction(id)));

  @Effect()
  navigateToEdit = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/logistica/embarques/embarques/edit/'))
    .map(r => _.replace(r, '/logistica/embarques/embarques/edit/', ''))
    .switchMap( id => Observable.of(new Embarques.SelectAction(id)));

  @Effect()
  navigateToTransitoEdit = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
      .map(r => r.payload.routerState.url)
      .filter( r => r.startsWith('/logistica/embarques/transito/edit/'))
      .map(r => _.replace(r, '/logistica/embarques/transito/edit/', ''))
      .switchMap( id => Observable.of(new Embarques.SelectAction(id)));

  @Effect()
  delete$ = this.actions$.ofType<Embarques.DeleteAction>(Embarques.DELETE)
    .map(action => action.payload)
    .switchMap(id =>
      this.service.delete(id))
    .map(dev => new Embarques.DeleteSuccessAction())
    .catch(error => Observable.of(new Embarques.DeleteErrorAction(error))
    );
  
  
  @Effect({dispatch: false}) registrarSalida$ = this.actions$
    .ofType<Embarques.RegistrarSalidaAction>(Embarques.REGISTRAR_SALIDA)
    .map(action => action.payload)
    .do( id => console.log('Registrando salida para embarque: ', id))
    .do( () => this.router.navigate(['/logistica/embarques/transito']));
    // .switchMap( id => {
    //   return Observable.of()
    // });

      // this.service.list(filter)
      //   .map(sols => new Embarques.SearchSuccessAction(sols))
      //   .catch(error => Observable.of(new Embarques.SelectErrorAction(error)))
    //);
    
  constructor(
    private actions$: Actions,
    private router: Router,
    private service: EmbarqueService
  ) {}
}
