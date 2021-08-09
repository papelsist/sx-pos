export interface DescuentoPorVolumen {
  tipo: string,
  descuento: number,
  importe: number
}

export const CONTADO: Array<DescuentoPorVolumen> = [
  {tipo: "CONTADO", descuento: 0,importe: 100.00},
  {tipo: "CONTADO", descuento: 8,importe: 1000.00},
  {tipo: "CONTADO", descuento: 10,importe: 5000.00},
  {tipo: "CONTADO", descuento: 12,importe: 12000.00},
  {tipo: "CONTADO", descuento: 14,importe: 21500.00},
  {tipo: "CONTADO", descuento: 15,importe: 46000.00},
  {tipo: "CONTADO", descuento: 16,importe: 82000.00},
  {tipo: "CONTADO", descuento: 17,importe: 150000.00},
  {tipo: "CONTADO", descuento: 18,importe: 300000.00},
  {tipo: "CONTADO", descuento: 19,importe: 500000.00},
  {tipo: "CONTADO", descuento: 20,importe: 50000000.01},
];

export const CREDITO: Array<DescuentoPorVolumen> = [
  {tipo: "CREDITO", descuento: 0,importe: 9500.00},
  {tipo: "CREDITO", descuento: 10,importe: 28500.00},
  {tipo: "CREDITO", descuento: 12,importe: 54000.00},
  {tipo: "CREDITO", descuento: 14,importe: 121000.00},
  {tipo: "CREDITO", descuento: 16,importe: 229000.00},
  {tipo: "CREDITO", descuento: 18,importe: 350000.00},
  {tipo: "CREDITO", descuento: 20,importe: 445000.00},
  {tipo: "CREDITO", descuento: 21,importe: 636000.00},
  {tipo: "CREDITO", descuento: 22,importe: 905000.00},
  {tipo: "CREDITO", descuento: 23,importe: 905000.01},
];
