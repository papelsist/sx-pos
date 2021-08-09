import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewContainerRef
} from '@angular/core';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';

import { Venta, Sucursal } from 'app/models';

@Component({
  selector: 'sx-facturados-list',
  templateUrl: './facturados-list.component.html',
  styles: [
    `
    .fill {
      height: 500px
    }
  `
  ]
})
export class FacturadosListComponent implements OnInit {
  @Input() facturas: Venta[];

  @Output() cancelar = new EventEmitter<any>();

  @Output() print = new EventEmitter<any>();

  @Output() envio = new EventEmitter<any>();

  @Output() cancelarEnvio = new EventEmitter<any>();

  columns: ITdDataTableColumn[] = [
    { name: 'tipo', label: 'Tipo', width: 30 },
    { name: 'documento', label: 'Factura', width: 60 },
    { name: 'fecha', label: 'Fecha', width: 50 },
    { name: 'nombre', label: 'Cliente', width: 350 },
    { name: 'total', label: 'Total', width: 50 },
    { name: 'updateUser', label: 'Usuario', width: 50 },
    { name: 'cuentaPorCobrar', label: 'CFDI', width: 50 },
    { name: 'formaDePago', label: 'F.Pago', width: 100 },
    { name: 'print', label: 'P', width: 150 }
  ];

  @Input() selectedRows: any[] = [];

  constructor() {}

  ngOnInit() {}

  getFormaDePago(row: Venta) {
    let fp = row.formaDePago;
    switch (row.formaDePago) {
      case 'TARJETA_DEBITO':
        fp = 'TAR_DEB';
        break;
      case 'TARJETA_CREDITO':
        fp = 'TAR_CRE';
        break;
      case 'TRANSFERENCIA':
        fp = 'TRANSF';
        break;
      case 'DEPOSITO_EFECTIVO':
        fp = 'DEP_EFE';
        break;
      case 'DEPOSITO_CHEQUE':
        fp = 'DEP_CHE';
        break;
      default:
        break;
    }
    return fp;
  }

  mailStatus(row) {
    if (row.enviado) {
      return `Enviado el ${moment(row.enviado).format('DD/MM/YYYY')}  a: ${
        row.cfdiMail
      }`;
    } else {
      return '';
    }
  }
}
