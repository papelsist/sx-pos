
import {Producto} from '@siipapx/models';

export interface SolicitudDeTrasladoDet {
  id?: string;
  producto: Producto;
  solicitado: number;
  recibido: number;
  cortes?: number;
  cortesInstruccion: string;
  comentario: string;
  dateCreated: string;
  lastUpdated: string;
}
