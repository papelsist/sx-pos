import { Producto, CompraDet } from "app/models";
import { RecepcionDeCompraDet } from "app/logistica/models/recepcionDeCompraDet";

export interface DevolucionDeCompraDet {
  id: string;
  analisisDevolucion: any;
  recepcionDeCompraDet?: RecepcionDeCompraDet
  inventario?: any
  producto: Producto
  cantidad: number
  costoDec?: number
  importeCosto?: number
  comentario?: string
  dateCreated?: string;
  lastUpdated?: string;
}