import * as embarques from '../actions/embarques.actions';
import { Embarque } from 'app/logistica/models/embarque';

export interface State {
  selected: Embarque;
  loading: boolean;
  entities: Embarque[];
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: [],
};

export function reducer(state = initialState, action: embarques.Actions): State {
  switch (action.type) {
    case embarques.SEARCH: {
      return {...state, loading: true}
    }
    case embarques.SEARCH_SUCCESS: {
      return {...state, loading: false, entities: action.payload}
    }
    case embarques.SEARCH_ERROR: {
      return {...state, loading: false}
    }
    case embarques.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case embarques.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case embarques.SELECT_ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    case embarques.DELETE_SUCCESS: {
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

export const getEmbarquesPorSalir = (state: State) => {
  return state.entities.filter( item => !item.salida )
};

