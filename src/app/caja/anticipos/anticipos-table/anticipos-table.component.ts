import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

import { Cobro } from 'app/models/cobro';

@Component({
  selector: 'sx-anticipos-table',
  templateUrl: './anticipos-table.component.html'
})
export class AnticiposTableComponent implements OnInit {
  @Input() anticipos = [];
  @Output() select = new EventEmitter<Cobro>();

  columns: ITdDataTableColumn[] = [
    { name: 'tipo', label: 'Tipo', width: 70 },
    {
      name: 'fecha',
      label: 'Fecha',
      numeric: false,
      width: 90
    },
    {
      name: 'cliente.nombre',
      label: 'Cliente'
    },
    {
      name: 'formaDePago',
      label: 'F.Pago',
      width: 100,
      format: value => this.slim(value)
    },

    {
      name: 'importe',
      label: 'Importe',
      width: 150
    },
    {
      name: 'disponible',
      label: 'Disponible',
      width: 150
    }
  ];

  constructor() {}

  ngOnInit() {}

  slim(formaDePago: string) {
    switch (formaDePago) {
      case 'TARJETA_DEBITO':
        return 'TAR_DEV';
      case 'TARJETA_CREDITO':
        return 'TAR_CRE';
      case 'TRANSFERENCIA':
        return 'TRANSF';
      case 'DEPOSITO_EFECTIVO':
        return 'DEP_EFE';
      case 'DEPOSITO_CHEQUE':
        return 'DEP_CHE';
      default:
        return formaDePago;
    }
  }
}
