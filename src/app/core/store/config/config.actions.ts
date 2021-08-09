import { Action } from '@ngrx/store';
import { AppConfig } from 'app/models/appConfig';

export const SET_SUCURSAL = '[App Config] Set sucursal';
export const SET_SUCURSAL_SUCCESS = '[App Config] Set sucees sucursal';
export const SET_SUCURSAL_ERROR = '[App Config] Set error sucursal';


export class SetSucursalAction implements Action {
  readonly type = SET_SUCURSAL;
}
export class SetSucursalSuccessAction implements Action {
  readonly type = SET_SUCURSAL_SUCCESS;

  constructor(public payload: any) {}
}
export class SetSucursalErrorAction implements Action {
  readonly type = SET_SUCURSAL_ERROR;

  constructor(public  payload: any) {}
}


export type Actions = SetSucursalAction | SetSucursalSuccessAction | SetSucursalErrorAction;
