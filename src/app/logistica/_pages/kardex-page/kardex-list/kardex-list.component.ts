import { Component, OnInit, Input } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

import { Inventario } from 'app/logistica/models/inventario';


@Component({
  selector: 'sx-kardex-list',
  templateUrl: './kardex-list.component.html',
  styleUrls: ['./kardex-list.component.scss']
})
export class KardexListComponent implements OnInit {

  @Input() movimientos: Inventario[] = [];

  columns: ITdDataTableColumn[] = [
    { name: 'clave',  label: 'Clave',width: 50},
    { name: 'descripcion',  label: 'Descripcion', width: 300},
    { name: 'fecha',  label: 'Fecha', width: 200},
    { name: 'documento',  label: 'Docto', width: 40},
    { name: 'tipo',  label: 'Tipo', width: 40},
    { name: 'cantidad',  label: 'Cantidad', width: 30},
    { name: 'kilos',  label: 'Kilos', width: 30},
  ];

  constructor() { }

  ngOnInit() {
  }

}
