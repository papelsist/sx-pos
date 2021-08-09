import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITdDataTableColumn} from '@covalent/core';

@Component({
  selector: 'sx-existencias-list',
  templateUrl: './existencias-list.component.html',
  styles: []
})
export class ExistenciasListComponent implements OnInit {

  @Input() existencias = [];

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Clave', sortable: true, width: 100 },
    { name: 'producto.descripcion', label: 'Descripción', filter: true, width: 400 },
    // { name: 'anio', label: 'Ejercicio', width: 100},
    // { name: 'mes', label: 'Mes', width: 100},
    { name: 'cantidad', label: 'Cantidad', width: 100},
    { name: 'recorte', label: 'Recorte', width: 100},
    { name: 'disponible', label: 'Disponible', width: 100},
    { name: 'recorteFecha', label: 'Recorte F', width: 120},
    { name: 'recorteComentario', label: 'Rec Com'},
    { name: 'lastUpdated', label: 'Modificado', width: 130},
  ];

  constructor() { }

  ngOnInit() {}

}



