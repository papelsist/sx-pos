import {Producto} from 'app/models';

export interface ConteoDet {
  id?: string;
  producto: Producto;
  cantidad: number;
  indice?: number;
}
