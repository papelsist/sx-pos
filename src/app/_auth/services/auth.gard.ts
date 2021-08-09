import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Auth from '../actions/auth.actions';
import * as fromAuth from '../reducers';
import { AppConfig } from 'app/models/appConfig';
import {AuthService} from '@siipapx/_auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<fromAuth.State>,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.authService.isLoggedIn()) {
      return Observable.of(true);
    } else {
      this.store.dispatch(new Auth.LoginRedirect({ queryParams: { returnUrl: state.url }}));
      return Observable.of(false);
    }
  }
}
