import {ActionReducerMap, createSelector, createFeatureSelector, Action, ActionReducer} from '@ngrx/store';

import * as fromRoot from 'app/reducers';
import * as pedido from '../actions/pedidos.actions';
import { Venta } from 'app/models';

export interface State {
  selected: Venta
}

export const initialState: State = {
  selected: null
};

export function reducer( state = initialState, action: pedido.Actions): State {
  switch (action.type) {
    case(pedido.SELECT): {
      return {
        ...state,
        selected: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

