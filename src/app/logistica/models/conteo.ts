import {Sucursal} from 'app/models';
import {Sector} from './sector';
import {ConteoDet} from './conteoDet';

export interface Conteo {
  id: string;
  sucursal: Sucursal;
  documento?: number;
  fecha: string;
  sector: Sector;
  auditor1?: string;
  auditor2?: string;
  capturista?: string;
  comentario?: string;
  contador1?: string;
  contador2?: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  partidas: Array<ConteoDet>;
}
