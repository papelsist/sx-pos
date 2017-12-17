import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Venta } from 'app/models';
import {ITdDataTableColumn} from '@covalent/core';

@Component({
  selector: 'sx-canceladas-list',
  templateUrl: './canceladas-list.component.html',
  styles: [`
    .fill {
      height: 500px
    }
  `]
})
export class CanceladasListComponent implements OnInit {

  @Input() facturas: Venta[];

  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'Factura',width: 50},
    { name: 'fecha',  label: 'Fecha', width: 50},
    { name: 'nombre',  label: 'Cliente', width: 350},
    { name: 'total',  label: 'Total',width: 50},
    { name: 'cuentaPorCobrar',  label: 'CFDI',width: 50},
  ];

  constructor() { }

  ngOnInit() {
  }

  getFormaDePago(row: Venta) {
    let fp = row.formaDePago;
    switch (row.formaDePago) {
      case 'TARJETA_DEBITO':
        fp = 'TAR_DEB';
        break;
      case 'TARJETA_CREDITO':
        fp = 'TAR_CRE';
        break;
      default:
        break;
    }
    return fp
  }

}


