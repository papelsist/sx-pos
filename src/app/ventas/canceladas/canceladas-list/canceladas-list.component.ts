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
    { name: 'tipo',  label: 'Tipo', width: 50},
    { name: 'documento',  label: 'Factura', width: 50},
    { name: 'fecha',  label: 'Fecha', width: 50},
    { name: 'cliente.nombre',  label: 'Cliente', width: 300},
    { name: 'cancelacionUsuario',  label: 'Canceló', width: 70},
    { name: 'cancelacionMotivo',  label: 'Motivo', width: 200},
    { name: 'uuid',  label: 'UUID', width: 450},
    { name: 'comentario',  label: 'Comentario'},
    // { name: 'total',  label: 'Total', width: 100},
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
  changeDate(fecha) {
    if (fecha) {
      const fechaFmt = new Date(fecha.substring(0, 10).replace(/-/g, '\/'));
      return fechaFmt
    }
    return fecha
  }

}


