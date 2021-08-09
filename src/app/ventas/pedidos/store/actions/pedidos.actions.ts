import { Action } from '@ngrx/store';
import {Venta} from 'app/models';

export const SELECT = '[Pedido] Select';

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: Venta) {}
}

export type Actions = Select;
