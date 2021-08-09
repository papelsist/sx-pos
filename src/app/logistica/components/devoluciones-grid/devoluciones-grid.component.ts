import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DevolucionDeVenta } from 'app/logistica/models/devolucionDeVenta';

@Component({
  selector: 'sx-devoluciones-grid',
  templateUrl: './devoluciones-grid.component.html',
  styleUrls: ['./devoluciones-grid.component.scss']
})
export class DevolucionesGridComponent implements OnInit {

  @Input() devoluciones: DevolucionDeVenta[] = [];

  constructor() { }

  ngOnInit() {
  }

}
