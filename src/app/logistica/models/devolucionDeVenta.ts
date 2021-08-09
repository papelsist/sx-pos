import { Sucursal, Venta } from "app/models";
import { DevolucionDeVentaDet } from "./devolucionDeVentaDet";

export interface DevolucionDeVenta {
  id: string;
  sucursal: Sucursal;
  venta: Venta;
  notaDeCredito: any;
  documento: number;
  fecha: string;
  importe: number;
  impuesto: number;
  total: number;
  importeCortes: number;
  comentario?: string;
  partidas: Array<DevolucionDeVentaDet>;
  dateCreated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
  fechaInventario: string;
}

