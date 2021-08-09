import { TrasladoDet } from 'app/logistica/models/trasladoDet';

export interface Traslado {
  id: string;
  tipo: string
  fecha: string
  documento: string
  comentario?: string
  partidas: Array<TrasladoDet>
  solicitudDeTraslado: any,
  cancelado?: Date,
  uuid?: string
  cfdi?: any
}

/**
 * String	id

    SolicitudDeTraslado	solicitudDeTraslado

    Inventario inventario

    Sucursal sucursal

    String	tipo

    Long	documento = 0

    Date	fecha

    Boolean	porInventario = false

    String	clasificacionVale

    BigDecimal  kilos     = 0

    String	comentario

    String cfdiId

    List partidas =[]

    Date dateCreated

    Date lastUpdated

    String createUser

    String updateUser

    String sw2

    Date fechaInventario

    Date asignado

    Chofer chofer

    static hasMany = [partidas:TrasladoDet]
 */
