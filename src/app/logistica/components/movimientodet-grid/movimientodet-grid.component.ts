import { Component, OnInit, Input } from '@angular/core';
import { ITdDataTableColumn } from "@covalent/core";

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);
const NUMBER_FORMAT: (v: any) => any = (v: number) => v;


@Component({
  selector: 'sx-movimientodet-grid',
  template: `
    <td-data-table dense
      [data]="partidas" 
      [columns]="columns">
    </td-data-table>
  `
})
export class MovimientoDetGridComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 50 },
    { name: 'producto.descripcion', label: 'Descripcion', width: 400},
    { name: 'cantidad', label: 'Cantidad', numeric: true, width: 10},
    { name: 'comentario', label: 'Comentario', width: 300},
  ];

  @Input() partidas = [];

  constructor() { }

  ngOnInit() { }
}