import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ITdDataTableColumn } from '@covalent/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sx-pendiente-por-cliente-dialog',
  templateUrl: './pendiente-por-cliente-dialog.component.html',
  styles: [
    `.pendientes-panel{
      width: 600px;
    }
    `
  ]
})
export class PendientePorClienteDialogComponent implements OnInit {
  pedidos: Array<any>;
  cliente: any;

  columns: ITdDataTableColumn[] = [
    { name: 'tipo', label: 'Tipo', sortable: true, width: 20 },
    { name: 'documento', label: 'Docto', sortable: true, width: 20 },
    { name: 'fecha', label: 'Fecha', filter: true, width: 100 },
    { name: 'total', label: 'Total', hidden: false, width: 120 },
    { name: 'updateUser', label: 'Usuario', hidden: false, width: 120 }
  ];

  constructor(
    private router: Router,
    public dialogRef: MdDialogRef<PendientePorClienteDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any // private router: Router
  ) {
    this.pedidos = data.pedidos;
    this.cliente = data.cliente;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  goTo(pedido) {
    this.router.navigate(['/ventas/pedidos/edit', pedido.id]);
    this.dialogRef.close();
  }
}
