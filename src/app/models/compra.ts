import { Sucursal } from './sucursal';
import { Proveedor } from './proveedor';
import { CompraDet } from './compraDet';

export interface Compra {
  id: string;
  sucursal: Sucursal;
  proveedor: Proveedor;
  folio: number;
  fecha: string;
  entrega?: string;
  comentario?: string;
  pendiente: boolean;
  centralizada: boolean;
  nacional: boolean;
  consolidada: boolean;
  especial: boolean;
  importeBruto: number;
  importeDescuento: number;
  importeNeto: number;
  impuestos: number;
  total: number;
  partidas: Array<CompraDet>;
  tipoDeCambio: number;
  modificado: string;
  cerrada: string;
  pendientes?: number;
  ultimaDepuracion?: string;
}
