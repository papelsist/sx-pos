import { Producto } from "app/models";

export interface MovimientoDet {
  id?: string,
  producto: Producto,
  cantidad: number,
  tipoCIS?: string,
  comentario?: string,
  dateCreated?: string,
  lastUpdated?: string
}