import { Component, OnInit, Input } from '@angular/core';
import { CorteCobranza } from '@siipapx/caja/models/corteCobranza';
import * as _ from 'lodash';

@Component({
  selector: 'sx-corte-cobranza-list',
  templateUrl: './corte-cobranza-list.component.html',
  styleUrls: ['./corte-cobranza-list.component.scss']
})
export class CorteCobranzaListComponent implements OnInit {

  @Input() cortes: CorteCobranza[] = [];

  constructor() { }

  ngOnInit() {
  }

  show(corte) {
    console.log('Show corte....');
  }

  porDepositar(row) {
    const res = row.pagosRegistrados - row.cortesAcumulado - row.deposito + row.cambiosDeCheques;
    return _.round(res, 2);
  }

  getFormaDePago(row) {
    if (row.formaDePago === 'TRANSFERENCIA') {
      return 'TRANSFER'
    } else {
      return row.formaDePago
    }
  }

}
