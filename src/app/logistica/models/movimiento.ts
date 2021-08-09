
import { Sucursal } from "app/models";

export interface Movimiento {
  id: string,
  sucursal: Sucursal,
  documento: number,
  fecha: string,
  tipo: string,
  porInventario: boolean,
  fechaInventario?: string,
  comentario?: string,
  partidas?: Array<any>,
  cancelado?: boolean,
  dateCreated?: string,
  lastUpdated?: string,
  createUser?: string,
  updateUser?: string

}
    