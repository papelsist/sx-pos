import { Action } from '@ngrx/store';
import { RecepcionDeCompra } from "app/logistica/models/recepcionDeCompra";

export const SEARCH = '[Coms] Search';
export const SEARCH_SUCCESS = '[Coms] Search Success';
export const SEARCH_ERROR = '[Coms] Search error'

export const SELECT = '[Coms] Select';
export const SELECT_SUCCESS = '[Coms] Select succes';
export const SELECT_ERROR = '[Coms] Select error';

export const DELETE = '[Coms] Delete';
export const DELETE_SUCCESS ='[Coms] Delete succcess';
export const DELETE_ERROR = '[Coms] Delete error';



export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: any) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: RecepcionDeCompra[]) {}
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

  constructor(public payload: RecepcionDeCompra) {}
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