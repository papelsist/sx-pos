import { Action } from '@ngrx/store';
import { DevolucionDeCompra } from 'app/logistica/models/devolucionDeCompra';

export const SEARCH = '[Decs] Search';
export const SEARCH_SUCCESS = '[Decs] Search Success';
export const SEARCH_ERROR = '[Decs] Search error'

export const SELECT = '[Decs] Select';
export const SELECT_SUCCESS = '[Decs] Select succes';
export const SELECT_ERROR = '[Decs] Select error';

export const DELETE = '[Decs] Delete';
export const DELETE_SUCCESS = '[Decs] Delete succcess';
export const DELETE_ERROR = '[Decs] Delete error';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: any) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: DevolucionDeCompra[]) {}
}

export class SearchError implements Action {
  readonly type = SEARCH_ERROR;

  constructor(public payload: any) {}
}

export class SelectAction  implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {}
}

export class SelectSuccessAction implements Action {
  readonly type = SELECT_SUCCESS;

  constructor(public payload: DevolucionDeCompra) {}
}

export class SelectErrorAction implements Action {
  readonly type = SELECT_ERROR;

  constructor(public payload: any) {}
}

export class DeleteAction implements Action {
  readonly type = DELETE;

  constructor(public payload: string) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor() {}
}

export class DeleteErrorAction implements Action {
  readonly type = DELETE_ERROR;

  constructor(public payload: any) {}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
| SearchAction
| SearchSuccessAction
| SearchError
| SelectAction
| SelectSuccessAction
| SelectErrorAction
| DeleteAction
| DeleteSuccessAction
| DeleteErrorAction
