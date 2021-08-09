
import * as conteos from '../actions/conteos.actions';
import { Conteo } from 'app/logistica/models/conteo';

export interface State {
  selected: Conteo;
  loading: boolean;
  entities: Conteo[];
  lastProcess: any;
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: [],
  lastProcess: undefined,
};

export function reducer(state = initialState, action: conteos.Actions): State {
  switch (action.type) {
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
    // Generar registros de conteo
    case conteos.GENERAR_CONTEO: {
      return {...state, loading: true};
    }
    case conteos.GENERAR_CONTEO_SUCCESS: {
      return {...state, loading: false, lastProcess: action.payload};
    }
    case conteos.GENERAR_CONTEO_ERROR: {
      return {...state, loading: false};
    }
    default:
      return state;
  }
}
// Basic entities selectors
export const getEntities = (state: State) => state.entities;
export const getSelected = (state: State) => state.selected;
export const getLoading = (state: State) => state.loading;
