import { Cliente, Sucursal } from 'app/models';
import { AplicacionDeCobro } from './aplicacionDeCobro';
import { Banco } from '@siipapx/models/banco';

export interface Cobro {
  id?: string;
  cliente: Cliente;
  sucursal: Sucursal;
  tipo: string;
  fecha: string;
  formaDePago: string;
  moneda: string;
  tipoDeCambio: number;
  importe: number;
  disponible: number;
  referencia?: string;
  primeraAplicacion?: string;
  anticipo?: boolean;
  enviado?: boolean;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  aplicaciones?: Array<AplicacionDeCobro>;
  tarjeta?: CobroTarjeta;
  cheque?: CobroCheque;
  porAplicar?: number;
  aplicado?: number;
}

export interface CobroTarjeta {
  id?: string;
  debitoCredito: boolean;
  visaMaster: boolean;
  validacion: number;
}

export interface CobroCheque {
  id?: string;
  banco: Banco;
  numero: string;
  numeroDeCuenta: string;
}
