import * as choferes from '../actions/choferes.actions';
import { Chofer } from 'app/logistica/models/chofer';

export interface State {
  selected: Chofer;
  loading: boolean;
  entities: Chofer[];
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: [],
};

export function reducer(state = initialState, action: choferes.Actions): State {
  switch (action.type) {
    case choferes.SEARCH: {
      return {...state, loading: true}
    }
    case choferes.SEARCH_SUCCESS: {
      return {...state, loading: false, entities: action.payload}
    }
    case choferes.SEARCH_ERROR: {
      return {...state, loading: false}
    }
    case choferes.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case choferes.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case choferes.SELECT_ERROR: {
      return {
        ...state,
        loading: false
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
