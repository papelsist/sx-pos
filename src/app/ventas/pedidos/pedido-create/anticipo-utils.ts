import { Venta, VentaDet } from '@siipapx/models';

export function buildAnticipoDet(venta: Venta): any {
  return {
    sucursal: venta.sucursal,
    producto: {
      id: '402880fc5e4ec411015e4efa9c2310d0',
      clave: 'ANTICIPO',
      descripcion: '= A N T I C I P O =',
    },
    cantidad: 1.0,
    precio: venta.importe,
    importe: venta.importe,
    descuento: 0.0,
    descuentoImporte: 0.0,
    subtotal: venta.importe,
    impuesto: venta.impuesto,
    impuestoTasa: venta.impuestoTasa,
    total: venta.total,
    nacional: true,
    comentario: venta.comentario,
    precioLista: venta.importe,
    precioOriginal: venta.importe,
    descuentoOriginal: 0.0,
  };
}
