import { Producto, Sucursal } from "@siipapx/models";

export interface CompraDet {
  id?: string;
  producto: Producto;
  solicitado: number;
  comentario?: string;
  sucursal?: Sucursal;  
  sw2?: string;
  pendiente?: number;
}