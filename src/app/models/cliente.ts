export class Cliente {
  id: string;
  nombre?: string;
  clave?: string;
  rfc?: string;
  credito?: ClienteCredito;
  email?: string;
  permiteCheque?: boolean;
  direccion?: {};
  telefonos?: Array<any>;
  cfdiMail?: string;
  cfdiValidado?: boolean;
  juridico?: boolean;
  chequeDevuelto?: number;
  folioRFC?: number;
}

export class ClienteCredito {
  id: string;
  creditoActivo: boolean;
  descuentoFijo: number;
  lineaDeCredito: number;
  plazo: number;
  saldo: number;
  postfechado: boolean;
  socio?: any;
}
