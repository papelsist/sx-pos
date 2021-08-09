import { Component, OnInit, Input } from '@angular/core';
import { TdDataTableService, ITdDataTableColumn } from '@covalent/core';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-cobranza-cod',
  templateUrl: './cobranza-cod.component.html',
})
export class CobranzaCodComponent implements OnInit {


  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'Documento', numeric: true, width: 15 },
    { name: 'fecha',  label: 'Fecha', width: 10},
    { name: 'cliente.nombre',  label: 'Cliente', width: 350},
    { name: 'updateUser',  label: 'Fact.', width: 10},
    { name: 'formaDePago',  label: 'F.Pago', width: 20},
    { name: 'total',  label: 'Total', width: 10},
    { name: 'cuentaPorCobrar',  label: 'CFDI', width: 10},
    { name: 'pagos',  label: 'Pagos', width: 10},
    { name: 'saldo',  label: 'Saldo', width: 10},
  ];

  data: any[] = [];

  constructor(
    private _dataTableService: TdDataTableService,
    private service: CajaService
  ) {}

  ngOnInit(): void {
    this.service.facturasPendientesCod()
    .subscribe( (pendientes: any) => {
      this.data = pendientes;
      }, error => console.log('Error: ', error)
    );
  }

  search(searchTerm: string): void {}

  cobrar(pedido: Venta) {
    console.log('Cobrando venta: ', pedido);
  }

  getFormaDePago(row: Venta) {
    switch (row.formaDePago) {
      case 'TARJETA_DEBITO':
        return 'TAR_DEB'
      case 'TARJETA_CREDITO':
        return 'TAR_CRE'
      case 'TRANSFERENCIA':
        return 'TRANS'
      case 'DEPOSITO_EFECTIVO':
        return 'DEP_EFE'
      case 'DEPOSITO_CHEQUE':
        return 'DEP_CHE'
      default:
        return row.formaDePago;

    }
  }

}

