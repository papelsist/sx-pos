import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Venta } from 'app/models/venta';
import { ComplementosService } from 'app/ventas/pedidos/services/complementos.service';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'sx-complementos',
  templateUrl: './complementos.component.html'
})
export class ComplementosComponent implements OnInit {
  pedidos$: Observable<Venta[]>;

  columns: ITdDataTableColumn[] = [
    { name: 'tipo', label: 'Tipo', width: 10 },
    { name: 'documento', label: 'Docto', width: 10 },
    { name: 'fecha', label: 'Fecha', width: 10 },
    { name: 'nombre', label: 'Cliente', width: 350 },
    { name: 'total', label: 'Total', width: 30 },
    { name: 'createUser', label: 'Creado', width: 50 },
    { name: 'comentario', label: 'Comentario', width: 170 },
    { name: 'operaciones', label: 'Opc', width: 200 }
  ];

  constructor(private service: ComplementosService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.pedidos$ = this.service.pendientes('');
  }

  search(term) {}

  onEdit(row) {}

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
}
