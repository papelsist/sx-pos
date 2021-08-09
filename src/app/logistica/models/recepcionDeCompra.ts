import { Sucursal, Proveedor, Compra } from 'app/models';
import { RecepcionDeCompraDet } from './recepcionDeCompraDet';

export interface RecepcionDeCompra {
  id: string;
  sucursal: Sucursal;
  documento: number;
  fecha: string;
  remision: string;
  fechaRemision: string;
  compra: Compra;
  proveedor: Proveedor;
  comentario?: string;
  partidas: Array<RecepcionDeCompraDet>;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  fechaInventario?: string;
}
