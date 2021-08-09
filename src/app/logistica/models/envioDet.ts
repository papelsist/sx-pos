import {Producto, VentaDet} from 'app/models';
import {Envio} from 'app/logistica/models/envio';

export interface EnvioDet {
  id?: string;
  ventaDet?: VentaDet;
  parcialDet?: any;
  producto: Producto
  cantidad?: number
  valor?: number
  instruccionEntregaParcial: string;
  dateCreated?: string
  lastUpdated?: string
  envio?: Envio;

}
