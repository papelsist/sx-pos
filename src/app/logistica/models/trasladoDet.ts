import { Producto } from "@siipapx/models";

export interface TrasladoDet {
  id: string
  producto: Producto
  solicitado: number
  cantidad: number
}