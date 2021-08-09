import { Producto } from 'app/models';


export interface CotizacionCaja {
        id?: string;
        sucursal?: string;
        producto?: Producto;
        fecha?: Date;
        cotizacion?: boolean;
        folio?: number;
        tipo?: string;
        resistenciaECT?: string;
        flauta ?: string;
        largo?: number;
        ancho?: number;
        altura?: number;
        metrosLineales?: number;
        piezas?: number;
        costo ?: number;
        precioPiezaContado?: number;
        precioPiezaCredito?: number;
        precioEspecialCredito?: number;
        precioEspecialContado?: number;
        kilos?: number;
        gramos?: number
        cerrada?: boolean;
        comentario?: string
        claveCaja?: string;
        descripcionCaja?: string;
        productoClave?: string;
        productoDescripcion?: string;
        productoPrecioContado?: number;
        productoPrecioCredito ?: number;

}