import { Action } from "@ngrx/store";

import { RecepcionDeCompra } from "app/logistica/models/recepcionDeCompra";
import * as coms from '../actions/coms.actions';

export interface State {
  selected: RecepcionDeCompra;
  loading: boolean;
  entities: RecepcionDeCompra[];
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: []
};

export function reducer(state = initialState, action: coms.Actions): State {
  switch (action.type) {
    case coms.SEARCH: {
      return {...state, loading: true}
    }
    case coms.SEARCH_SUCCESS: {
      return {...state, loading: false, entities: action.payload}
    }
    case coms.SEARCH_ERROR: {
      return {...state, loading: false}
    }
    case coms.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case coms.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case coms.SELECT_ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    case coms.DELETE_SUCCESS: {
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
