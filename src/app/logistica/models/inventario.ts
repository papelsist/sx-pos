import { Producto, Sucursal } from "app/models";

export interface Inventario {
  id: string
  producto: Producto,
  sucursal: Sucursal,
  fecha: string,
  documento: number,
  tipo: string,
  tipoVenta: string,
  cantidad: number,
  renglon: number,
  comentario: string
}
/*
Sucursal	sucursal

    Producto	producto

    Date	fecha

    Long	documento	 = 0

    String	tipo

    String tipoVenta

    BigDecimal	cantidad	 = 0

    BigDecimal	kilos	 = 0

    Boolean	nacional	 = true

    BigDecimal	costo	 = 0

    BigDecimal	costoPromedio	 = 0

    BigDecimal	costoUltimaCompra	 = 0

    BigDecimal	costoReposicion	 = 0

    String	comentario

    String sw2

    Integer renglon

    Date dateCreated

    Date lastUpdated

    String createUser

    String updateUser

    */