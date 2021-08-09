import {Producto} from 'app/models';

export interface SectorDet {
  id?: string;
  producto: Producto;
  cantidad: number;
  comentario: string;
  indice: number;
  subsector: number;
}
