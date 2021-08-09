import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromAuth from '../reducers';
import { User, Authenticate } from '../models/user';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class AuthService {

  private authentication;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private store: Store<fromAuth.State>) {}

  login(auth: Authenticate) {
    const url = this.config.buildApiUrl('login');
    return this.http.post(url, auth)
  }

  logout() {
    return of(true);
  }

  getCurrentUser() {
    return this.store
      .select(fromAuth.getAuthentication)
  }

  getUser() {
    return this.store.select(fromAuth.getCurrentUser);
  }

  isLoggedIn() {
    if (this.getAuthentication() && !this.hasTokeExpire()) {
      return true
    }
    return false;
  }

  getAuthentication() {
    if (!this.authentication) {
      this.authentication = JSON.parse(localStorage.getItem('auth'));
    }
    return this.authentication;
  }

  getToken() {
    // return this.getProperty('access_token');
    if (this.getAuthentication()) {
      return this.getAuthentication().access_token;
    }
    return null
  }

  hasTokeExpire() {
    return false;
  }

  private getProperty(property: string): any {
    //noinspection TsLint
    if (!this.authentication) {
      throw new Error(`Attempted to access authentication property
        before user is properly logged in`);
    }

    if (!this.authentication[property]) {
      throw new Error(`
      Required property ${property} was not defined within the authentication object. Please double check the
      assets/config.json file`);
    }
    return this.authentication[property];
  }
}
