import { Action } from '@ngrx/store';

import { Chofer } from 'app/logistica/models/chofer';


export const SEARCH = '[Chofer] Search';
export const SEARCH_SUCCESS = '[Chofer] Search Success';
export const SEARCH_ERROR = '[Chofer] Search error'

export const SELECT = '[Chofer] Select';
export const SELECT_SUCCESS = '[Chofer] Select succes';
export const SELECT_ERROR = '[Chofer] Select error';


export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload?: any) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: Chofer[]) {}
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

  constructor(public payload: Chofer) {}
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