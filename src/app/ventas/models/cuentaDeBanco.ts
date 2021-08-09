export interface  CuentaDeBanco {
  id: string
  numero: string,
  clave: string,
  bancoSat?: {},
  descripcion?: string
  tipo?: string
  moneda?: string
  activo: boolean
}
