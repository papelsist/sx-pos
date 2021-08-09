import { Sucursal } from "app/models";

export interface Morralla {
  id?: string
  fecha: string
  tipo: string
  importe: number
  sucursal:	Sucursal
  comentario?:	string
}
