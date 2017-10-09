import { Action } from '@ngrx/store';

import { Conteo } from 'app/logistica/models/conteo';

export const SEARCH = '[Conteo] Search';
export const SEARCH_SUCCESS = '[Conteo] Search Success';
export const SEARCH_ERROR = '[Conteo] Search error'

export const SELECT = '[Conteo] Select';
export const SELECT_SUCCESS = '[Conteo] Select succes';
export const SELECT_ERROR = '[Conteo] Select error';

export const DELETE = '[Conteo] Delete';
export const DELETE_SUCCESS = '[Conteo] Delete succcess';
export const DELETE_ERROR = '[Conteo] Delete error';



export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload?: any) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: Conteo[]) {}
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

  constructor(public payload: Conteo) {}
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
