import { Component, OnInit, Input } from '@angular/core';
import { ITdDataTableColumn } from "@covalent/core";

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);
const NUMBER_FORMAT: (v: any) => any = (v: number) => v;


@Component({
  selector: 'sx-devoluciondet-grid',
  template: `
    
    <td-data-table 
      [data]="partidas" 
      [columns]="columns">
    </td-data-table>
  `
})
export class DevolucionDetGridComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 50 },
    { name: 'producto.descripcion', label: 'Descripcion', width: { min: 300, max: 400 }},
    { name: 'cantidad', label: 'Cantidad', numeric: true, format: DECIMAL_FORMAT},
    { name: 'comentario', label: 'Comentario', width: { min: 200, max: 450 }},
  ];

  @Input() partidas = [];

  constructor() { }

  ngOnInit() { }
}