import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import { FondoFijo } from 'app/caja/models/fondoFijo';


@Component({
  selector: 'sx-fondo-fijo-list',
  templateUrl: './fondo-fijo-list.component.html',
  styleUrls: ['./fondo-fijo-list.component.scss']
})
export class FondoFijoListComponent implements OnInit {
  
  @Input() movimientos: FondoFijo[] = [];

  @Input() selectedRows: any[] = [];

  @Output() edit = new EventEmitter<FondoFijo>();

  columns: ITdDataTableColumn[] = [
    { name: 'fecha',  label: 'Fecha', width: 200 },
    { name: 'documento', label: 'Documento', width: 200 },
    { name: 'rembolso', label: 'Rembolso', width: 20},
    { name: 'solicitado', label: 'Solicitado', width:100 },
    { name: 'importe', label: 'Importe', width:100},
    { name: 'comentario', label: 'Comentario', width: 300},
    { name: 'editar', label: 'Editar', width: 50},
  ];

  // filteredData: any[] = this.movimientos;

  constructor() {}

  ngOnInit(): void {}

  search(searchTerm: string): void {
  }

}
