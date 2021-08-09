import { Action } from "@ngrx/store";

import { DevolucionDeCompra } from "app/logistica/models/devolucionDeCompra";
import * as decs from '../actions/decs.actions';

export interface State {
  selected: DevolucionDeCompra;
  loading: boolean;
  entities: DevolucionDeCompra[];
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: []
};

export function reducer(state = initialState, action: decs.Actions): State {
  switch (action.type) {
    case decs.SEARCH: {
      return {
        ...state,
        loading: true
      }
    }
    case decs.SEARCH_SUCCESS: {
      return {
        ...state,
        entities: action.payload,
        loading: false
      }
    }
    case decs.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case decs.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case decs.SELECT_ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    case decs.DELETE_SUCCESS: {
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
