import { Component, OnInit, Input } from '@angular/core';
import { ITdDataTableColumn } from "@covalent/core";


const NUMBER_FORMAT: (v: any) => any = (v: number) => v.toLocaleString('en-us')

@Component({
  selector: 'sx-comdet-grid',
  template: `
    <div layout layout-align="center center"> 
      <td-data-table flex="80" [style.height.px]="550"
        [data]="partidas" 
        [columns]="columns">
      </td-data-table>
    </div>
  `
})
export class ComdetGridComponent implements OnInit {

  /*
  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto'},
    { name: 'producto.descripcion', label: 'Descripcion'},
    { name: 'cantidad', label: 'Cantidad'},
    { name: 'comentario', label: 'Comentario'},
  ];
  */

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 50},
    { name: 'producto.descripcion', label: 'Descripción', width: 350},
    { name: 'compraDet.solicitado', label: 'Solicitado', width: 30,numeric: true, format: NUMBER_FORMAT },
    //{ name: 'compraDet.recibido', label: 'Recibido', width: 30, numeric: true, format: NUMBER_FORMAT },
    //{ name: 'compraDet.depurado', label: 'Depurado', width: 30, numeric: true, format: NUMBER_FORMAT },
    { name: 'cantidad', label: 'Recibido', width: 30},
    // { name: 'quitar', label: 'Eliminar', width: 20},
  ];

  @Input() partidas ;

  constructor() { }

  ngOnInit() { }
}