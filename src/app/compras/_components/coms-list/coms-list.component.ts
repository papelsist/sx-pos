import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-coms-list',
  templateUrl: './coms-list.component.html',
  styles: []
})
export class ComsListComponent implements OnInit {
  @Input() coms: Array<any> = [];

  @Input() selectedRows: any[] = [];

  @Output() printReport = new EventEmitter<any>();

  columns: ITdDataTableColumn[] = [
    { name: 'documento', label: 'Docto', width: { min: 10, max: 20 } },
    { name: 'fecha', label: 'Fecha', width: { min: 10, max: 20 } },
    { name: 'compra', label: 'Compra', width: { min: 10, max: 20 } },
    { name: 'remision', label: 'Rem', width: { min: 10, max: 20 } },
    { name: 'fechaRemision', label: 'Fecha R.', width: { min: 10, max: 20 } },
    { name: 'proveedor.nombre', label: 'Proveedor', width: 250 },
    { name: 'comentario', label: 'Comentario', width: 200 },
    { name: 'fechaInventario', label: 'Inventariado', width: 40 },
    { name: 'updateUser', label: 'Modificado', width: 20 },
    { name: 'operaciones', label: 'Opc', width: 200 }
  ];

  constructor() {}

  ngOnInit() {}
}
