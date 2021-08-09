import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
import * as sols from '../actions/sols.actions';

export interface State {
  selected: SolicitudDeTraslado;
  loading: boolean;
  entities: SolicitudDeTraslado[];
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: []
};

export function reducer(state = initialState, action: sols.Actions): State {
  switch (action.type) {
    case sols.SEARCH: {
      return {...state, loading: true}
    }
    case sols.SEARCH_SUCCESS: {
      return {...state, loading: false, entities: action.payload}
    }
    case sols.SEARCH_ERROR: {
      return {...state, loading: false}
    }
    case sols.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case sols.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case sols.SELECT_ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    case sols.DELETE_SUCCESS: {
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
