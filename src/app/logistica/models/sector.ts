import {Sucursal} from 'app/models';
import {SectorDet} from './sectorDet';

export interface Sector {
  id: string;
  sucursal: Sucursal;
  sectorFolio: number;
  comentario: string;
  responsable1: string;
  responsable2: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  partidas: Array<SectorDet>
}
