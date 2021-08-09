import { Action } from '@ngrx/store';
import { Cliente, Sucursal } from 'app/models';

export const SELECT_CLIENTE = '[Pedido form] Select cliente';
export const SELECT_SUCURSAL = '[Pedido form] Select sucursal';



export class SelectClienteAction implements Action {
  readonly type = SELECT_CLIENTE;

  constructor(public payload?: Cliente) {}
}

export class SelectSucursalAction implements Action {
  readonly type = SELECT_SUCURSAL;

  constructor(public payload: Sucursal) {}
}

export type Actions =
  | SelectClienteAction
  | SelectSucursalAction
 