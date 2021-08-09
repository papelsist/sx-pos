import * as facs from '../actions/facturistas.actions';
import { Facturista } from 'app/logistica/models/facturista';

export interface State {
  selected: Facturista;
  loading: boolean;
  entities: Facturista[];
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: [],
};

export function reducer(state = initialState, action: facs.Actions): State {
  switch (action.type) {
    case facs.SEARCH: {
      return {...state, loading: true}
    }
    case facs.SEARCH_SUCCESS: {
      return {...state, loading: false, entities: action.payload}
    }
    case facs.SEARCH_ERROR: {
      return {...state, loading: false}
    }
    case facs.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case facs.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case facs.SELECT_ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    case facs.DELETE_SUCCESS: {
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
