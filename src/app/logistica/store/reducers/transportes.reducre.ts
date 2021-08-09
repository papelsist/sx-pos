import * as transportes from '../actions/transportes.actions';
import { Transporte } from 'app/logistica/models/transporte';

export interface State {
  selected: Transporte;
  loading: boolean;
  entities: Transporte[];
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: [],
};

export function reducer(state = initialState, action: transportes.Actions): State {
  switch (action.type) {
    case transportes.SEARCH: {
      return {...state, loading: true}
    }
    case transportes.SEARCH_SUCCESS: {
      return {...state, loading: false, entities: action.payload}
    }
    case transportes.SEARCH_ERROR: {
      return {...state, loading: false}
    }
    case transportes.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case transportes.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case transportes.SELECT_ERROR: {
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
