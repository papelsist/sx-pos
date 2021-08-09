import { Producto } from 'app/models';
import { CompraDet } from 'app/models/compraDet';

export interface RecepcionDeCompraDet {
    id?: string;
    inventario: any;
    compraDet: CompraDet;
    producto: Producto;
    cantidad: number;
    kilos: number;
    comentario?: string;
    dateCreated?: string;
    lastUpdated?: string;
    devuelto?: number;
    disponible?: number;
}
