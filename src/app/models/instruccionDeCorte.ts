export interface InstruccionDeCorte {
  id?: string;
  tipo: string;
  cantidad: number;
  precio: number;
  ancho?: number;
  largo?: number;
  refinado?: boolean;
  seleccionCalculo?: string;
  instruccion?: string;
  instruccionEmpacado?: string;
  ventaDet?: any;
}
