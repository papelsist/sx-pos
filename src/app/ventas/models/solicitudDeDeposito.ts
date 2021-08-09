import {Cliente, Sucursal} from '@siipapx/models';

export interface SolicitudDeDeposito {
  id: string
  sucursal: Sucursal
  cliente: Cliente
  cobro?: {},
  banco: {},
  cuenta: {},
  tipo: string,
  folio: number,
  fecha: string
  fechaDeposito: string
  referencia: string
  cheque: number
  efectivo: number
  transferencia: number
  total: number
  comentario: string
  cancelacion?: string
  cancelacionComentario?: string
  enviado: boolean
  dateCreated?: string
  lastUpdated?: string
  createUser?: string
  updateUser: string;
}
