import { Sucursal } from "app/models";

export interface CorteCobranza {
  id?: string,
  sucursal: Sucursal;
  formaDePago: string
  tipoDeVenta: string
  deposito: number // El importe del corte
  pagosRegistrados: number // Acumulado de pagos registrados en el dia hasta el momento del corte
  cortesAcumulado: number //Acumulado de cortes anteriores 
  cambiosDeCheques: number // Cambios de cheques acumulados
  corte: string // Fecha y hora del corte
  fecha: string // Fecha que asigna el usuario 
  cierre: boolean
  anticipoCorte: boolean
  fechaDeposito: string //
  cambioCheque: boolean	
  comentario?: string
}
