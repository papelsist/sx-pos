import { Sucursal } from 'app/models';

export interface FondoFijo {
  id?:	string;
  rembolso?: boolean;
  fecha:	string;
  documento: string;
  descripcion: string;
  importe: number;
  fondo?: FondoFijo;
  solicitud?: string;
  solicitado?: string;
  sucursal:	Sucursal;
  comentario?:	string;
}
