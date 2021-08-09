import { Action } from '@ngrx/store';

import { Transporte } from 'app/logistica/models/transporte';


export const SEARCH = '[Transporte] Search';
export const SEARCH_SUCCESS = '[Transporte] Search Success';
export const SEARCH_ERROR = '[Transporte] Search error'

export const SELECT = '[Transporte] Select';
export const SELECT_SUCCESS = '[Transporte] Select succes';
export const SELECT_ERROR = '[Transporte] Select error';


export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload?: any) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: Transporte[]) {}
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

  constructor(public payload: Transporte) {}
}

export class SelectErrorAction implements Action {
  readonly type = SELECT_ERROR;

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