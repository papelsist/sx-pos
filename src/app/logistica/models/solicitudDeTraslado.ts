import {Sucursal} from 'app/models';
import {SolicitudDeTrasladoDet} from 'app/logistica/models/solicitudDeTrasladoDet';

export interface SolicitudDeTraslado {
  id: string;
  sucursalSolicita: Sucursal;
  sucursalAtiende: Sucursal;
  documento: number;
  fecha: string;
  referencia?: string;
  venta?: string;
  clasificacionVale?: string;
  noAtender?: boolean;
  comentario?: string;
  partidas: Array<SolicitudDeTrasladoDet>;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  atender?: any
  chofer?: any
}
