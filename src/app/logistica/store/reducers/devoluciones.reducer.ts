import { Action } from "@ngrx/store";

import { DevolucionDeVenta } from "app/logistica/models/devolucionDeVenta";
import * as devs from '../actions/devoluciones.actions';

export interface State {
  selected: DevolucionDeVenta;
  filter: { [key:string]: string; }
  loading: boolean;
  entities: DevolucionDeVenta[];
}

export const initialState: State = {
  selected: undefined,
  filter: {},
  loading: false,
  entities: []
};

export function reducer(state = initialState, action: devs.Actions): State {
  switch (action.type) {
    case devs.SEARCH: {
      return {
        ...state,
        filter: action.payload,
        loading: true
      }
    }
    case devs.SEARCH_SUCCESS: {
      return {
        ...state,
        entities: action.payload,
        loading: false
      }
    }
    case devs.SEARCH_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case devs.SELECT: {
      return {
        ...state,
        // loading: true
      }
    }
    case devs.SELECT_SUCCESS: {
      return {
        ...state,
        // loading: false,
        selected: action.payload
      }
    }
    case devs.SELECT_ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    case devs.DELETE_SUCCESS: {
      return {
        ...state,
        selected: null
      }
    } 
    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getSelected = (state: State) => state.selected;
export const getFilter = (state: State) => state.filter;
export const getLoading = (state: State) => state.loading;
