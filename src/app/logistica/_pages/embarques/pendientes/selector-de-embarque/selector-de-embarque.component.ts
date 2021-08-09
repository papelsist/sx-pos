import { Component, OnInit, Inject } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { ITdDataTableColumn, TdDataTableSortingOrder } from '@covalent/core';

import { Embarque } from 'app/logistica/models/embarque';

@Component({
  selector: 'sx-selector-de-embarque',
  templateUrl: './selector-de-embarque.component.html',
  styleUrls: ['./selector-de-embarque.component.scss']
})
export class SelectorDeEmbarqueComponent implements OnInit {

  facturas: Array<any>;
  embarques: Embarque[];

  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'Documento', sortable: true, width: 50 },
    { name: 'chofer.nombre', label: 'Chofer', filter: true, width: 350 },
    { name: 'empleado', label: 'Empleado', filter: true, width: 350 },
  ];

  sortBy = "documento";
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    public dialogRef: MdDialogRef<SelectorDeEmbarqueComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.facturas = data.facturas;
    this.embarques = data.embarques;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    this.dialogRef.close(this.selectedRows[0]);
  }

}
