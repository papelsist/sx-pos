import { Action } from '@ngrx/store';
import {SolicitudDeDeposito} from '@siipapx/ventas/models/solicitudDeDeposito';

export const LOAD_PENDIENTES = '[SolicitudDeDeposito] Load pendientes';
export const LOAD_PENDIENTES_SUCCESS = '[SolicitudDeDeposito] Load pendientes Success';

export const SAVE = '[SolicitudDeDeposito] Save';
export const SAVE_SUCCESS = '[SolicitudDeDeposito] Save succes';
export const SAVE_ERROR = '[SolicitudDeDeposito] Save error';

export const SEARCH = '[SolicitudDeDeposito] Search';
export const SEARCH_SUCCESS = '[SolicitudDeDeposito] Search Success';
export const SEARCH_ERROR = '[SolicitudDeDeposito] Search error'

export const SELECT = '[SolicitudDeDeposito] Select';
export const SELECT_SUCCESS = '[SolicitudDeDeposito] Select succes';
export const SELECT_ERROR = '[SolicitudDeDeposito] Select error';

export const DELETE = '[SolicitudDeDeposito] Delete';
export const DELETE_SUCCESS = '[SolicitudDeDeposito] Delete succcess';
export const DELETE_ERROR = '[SolicitudDeDeposito] Delete error';

export class LoadPendientesAction implements Action {
  readonly type = LOAD_PENDIENTES;
}

export class LoadPendientesSuccessAction implements Action {
  readonly type = LOAD_PENDIENTES_SUCCESS;

  constructor(public payload: SolicitudDeDeposito[]) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;

  constructor(public payload?: SolicitudDeDeposito) {}
}
export class SaveSuccess implements Action {
  readonly type = SAVE_SUCCESS;

  constructor(public payload?: SolicitudDeDeposito) {}
}
export class SaveError implements Action {
  readonly type = SAVE_ERROR;

  constructor(public payload?: any) {}
}

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload?: any) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: SolicitudDeDeposito[]) {}
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

  constructor(public payload: SolicitudDeDeposito) {}
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
  | LoadPendientesAction
  | LoadPendientesSuccessAction
  | SaveAction
  | SaveSuccess
  | SaveError
  | SearchAction
  | SearchSuccessAction
  | SearchError
  | SelectAction
  | SelectSuccessAction
  | SelectErrorAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteErrorAction
