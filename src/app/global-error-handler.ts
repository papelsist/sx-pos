import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as fromRoot from './reducers';
import * as auth from './_auth/actions/auth.actions';
/**
 * Custom implementation of ErrorHandler
 */
@Injectable()
export  class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {

    const store = this.injector.get(Store);
    if (error instanceof HttpErrorResponse && error.status === 401) {
      console.log('SX HttpErrorResponse: ', error.status);
      // console.log('Store: ', store);
      // store.dispatch(new auth.LoginRedirect({}))
    } else {
      console.log('SX-Error handler:', error);
    }

  }
}
