import * as auth from '../actions/auth.actions';
import { User } from '../models/user';

export interface State {
  loggedIn: boolean;
  user: User | null;
  authentication: {};
}

export function getInitlaState() {
  return JSON.parse(localStorage.getItem('auth')) || {}
}

export const initialState: State = {
  loggedIn: false,
  user: undefined,
  authentication: getInitlaState()
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        authentication: action.payload
      };
    }

    case auth.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getAuthentication = (state: State) => state.authentication;
