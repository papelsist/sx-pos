
import * as secs from '../actions/sectores.actions';
import {Sector} from 'app/logistica/models/sector';

export interface State {
  selected: Sector;
  loading: boolean;
  entities: Sector[];
  lastProcess: any;
}

export const initialState: State = {
  selected: undefined,
  loading: false,
  entities: [],
  lastProcess: undefined,
};

export function reducer(state = initialState, action: secs.Actions): State {
  switch (action.type) {
    case secs.SEARCH: {
      return {...state, loading: true}
    }
    case secs.SEARCH_SUCCESS: {
      return {...state, loading: false, entities: action.payload}
    }
    case secs.SEARCH_ERROR: {
      return {...state, loading: false}
    }
    case secs.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case secs.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case secs.SELECT_ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    case secs.DELETE_SUCCESS: {
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
