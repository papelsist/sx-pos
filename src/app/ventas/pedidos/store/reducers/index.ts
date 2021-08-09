import {ActionReducerMap, createSelector, createFeatureSelector, Action, ActionReducer} from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import {Venta} from 'app/models';
import * as fromPedidos from './pedidos.reducer';

export interface PedidosState {
  pedidos: fromPedidos.State
}

export interface State extends fromRoot.State {
  'pedidos': PedidosState
}

export const reducers = {
  'pedidos': fromPedidos.reducer
}


