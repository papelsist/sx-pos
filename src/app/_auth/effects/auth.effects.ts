import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  /**
   * Side effect to login to the system using the authService for an async call and dispatching either a LoginSuccess
   * action with an authentication payload or a LoginFailure with an error as a payload
   *
   * @type {Observable<any>}
   */
  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .login(auth)
        .map( authentication => {
          return new Auth.LoginSuccess(authentication, auth.returnUrl);
        })
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  /**
   * Side effect to navigate to an url after a success login. The url could be the returnUrl in case of a redirect or
   * de '/' home route of the app
   * @type {Observable<LoginSuccess>}
   */
  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType<Auth.LoginSuccess>(Auth.LOGIN_SUCCESS)
    .do((action: Auth.LoginSuccess) => {
      // console.log('Save auth in local storage: ', action.payload);
      // console.log('Return url: ', action.returUrl);
      localStorage.setItem('auth', JSON.stringify(action.payload));
      this.router.navigateByUrl(action.returUrl);
    });

  /**
   * Side effect that takes care of two kind of actions:
   *  LOGOUT - To exit the app
   *  LOGIN_REDIRECT - to login again to the app, usually because of a token expiration
   * in both cases the auth object is remove from the local storage
   *
   * @type {Observable<any>}
   */
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(authed => {
      const state = this.router.routerState.snapshot;
      localStorage.removeItem('auth');
      // this.router.navigate(['/login'],  { queryParams: { returnUrl: state.url }});
      this.router.navigate(['/login']);
    });

  /**
   * SideEffect to detect  Http errors with code 401 (UNAUTHORIZED) dispatches a new action of type LoginRedirect
   * that in turn would allow the user to login back to the sistem.
   * To catch all 401 errors it crucial that the payload contains a status with code 401
   *
   *
   * @type {Observable<any>}
   */
  @Effect() errorStatus401$ = this.actions$
    .filter( (action: any) => action.payload && action.payload.status === 401)
    // .do( value => console.log('401 redireccionando para accesar nuevamente al sistema: ', value))
    .switchMap(payload => {
      return Observable.of(new Auth.LoginRedirect({}));
    });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
