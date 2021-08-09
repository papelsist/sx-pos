import { Action } from '@ngrx/store';
import { Modulo } from '../models/modulo';

export const SELECT = '[Modulo] Select';


export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: Modulo) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = SelectAction;
