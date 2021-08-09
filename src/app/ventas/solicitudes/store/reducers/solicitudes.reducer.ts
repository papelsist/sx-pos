
import * as conteos from '../actions/solicitudes.actions';

import {SolicitudDeDeposito} from 'app/ventas/models/solicitudDeDeposito';


export interface State {
  selected: SolicitudDeDeposito;
  loading: boolean;
  entities: SolicitudDeDeposito[];
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: [],
};

export function reducer(state = initialState, action: conteos.Actions): State {
  switch (action.type) {
    case conteos.LOAD_PENDIENTES: {
      return {...state, loading: true}
    }
    case conteos.LOAD_PENDIENTES_SUCCESS: {
      return {...state, loading: false, entities: action.payload}
    }
    case conteos.SAVE: {
      return {...state, loading: true}
    }
    case conteos.SAVE_SUCCESS: {
      return {...state, loading: false}
    }
    case conteos.SAVE_ERROR: {
      return {...state, loading: false}
    }
    case conteos.SEARCH: {
      return {...state, loading: true}
    }
    case conteos.SEARCH_SUCCESS: {
      return {...state, loading: false, entities: action.payload}
    }
    case conteos.SEARCH_ERROR: {
      return {...state, loading: false}
    }
    case conteos.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case conteos.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case conteos.SELECT_ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    case conteos.DELETE_SUCCESS: {
      return {
        ...state,
        selected: null
      }
    }
    default:
      return state;
  }
}
// Basic entities selectors
export const getEntities = (state: State) => state.entities;
export const getSelected = (state: State) => state.selected;
export const getLoading = (state: State) => state.loading;
