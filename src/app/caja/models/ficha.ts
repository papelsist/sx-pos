import { Sucursal } from 'app/models';
import { FichaDet } from 'app/caja/models/fichaDet';

export interface Ficha {
  id?: string;
  folio: number;
  sucursal: Sucursal;
  origen: string;
  fecha: string;
  cheque: number;
  efectivo: number;
  total: number;
  cuentaDeBanco: any;
  tipoDeFicha: string;
  fechaCorte: string;
  cancelada: string;
  comentario: string;
  tipo: string;
  dateCreated: string;
  lastUpdated: string;
  partidas: Array<FichaDet>;
}
