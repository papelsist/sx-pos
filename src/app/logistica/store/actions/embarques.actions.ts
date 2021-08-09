import { Action } from '@ngrx/store';

import { Embarque } from 'app/logistica/models/embarque';


export const SEARCH = '[Embarque] Search';
export const SEARCH_SUCCESS = '[Embarque] Search Success';
export const SEARCH_ERROR = '[Embarque] Search error'

export const SELECT = '[Embarque] Select';
export const SELECT_SUCCESS = '[Embarque] Select succes';
export const SELECT_ERROR = '[Embarque] Select error';

export const DELETE = '[Embarque] Delete';
export const DELETE_SUCCESS = '[Embarque] Delete succcess';
export const DELETE_ERROR = '[Embarque] Delete error';

export const REGISTRAR_SALIDA = '[Embarque] Registrar salida';

export class SearchAction implements Action {
  readonly type = SEARCH;
 
  constructor(public payload?: any) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: Embarque[]) {}
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

  constructor(public payload: Embarque) {}
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

export class RegistrarSalidaAction implements Action {
  readonly type = REGISTRAR_SALIDA;

  constructor(public payload: string) {}
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
  | RegistrarSalidaAction
