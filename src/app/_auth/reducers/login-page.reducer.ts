import * as auth from '../actions/auth.actions';
import {HttpErrorResponse} from '@angular/common/http';

export interface State {
  error: { message: string, httpError: HttpErrorResponse } | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case auth.LOGIN_FAILURE: {
      const httpError = action.payload;
      const message = httpError.status === 401 ? 'Error de acceso nombre de usuario o password incorrectos' : httpError.message;
      const ex =  {
        message,
        httpError
      }
      return {
        ...state,
        error: ex,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
