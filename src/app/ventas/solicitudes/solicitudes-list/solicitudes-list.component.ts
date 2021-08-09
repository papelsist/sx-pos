import { Component, OnInit, Input } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

import { SolicitudDeDeposito } from 'app/ventas/models/solicitudDeDeposito';

@Component({
  selector: 'sx-solicitudes-list',
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.scss']
})
export class SolicitudesListComponent implements OnInit {
  @Input() solicitudes: SolicitudDeDeposito[];

  columns: ITdDataTableColumn[] = [
    { name: 'folio', label: 'Folio', width: 30 },
    { name: 'cliente.nombre', label: 'Cliente', width: 300 },
    { name: 'fechaDeposito', label: 'F Depósito', width: 120 },
    { name: 'total', label: 'Total', width: 100 },
    { name: 'updateUser', label: 'Solicita', width: 100 },
     { name: 'lastUpdated', label: 'Modificado', width: 100 },
    { name: 'comentario', label: 'Comentario',width:200 },
    { name: 'cancelacion', label: 'Cancelado', width: 100 },
  ];

  constructor() {}

  ngOnInit() {
    console.log(this.solicitudes)

  }
}
