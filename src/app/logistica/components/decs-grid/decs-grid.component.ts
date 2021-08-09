import { Component, OnInit, Input } from '@angular/core';

import { DevolucionDeCompra } from 'app/logistica/models/devolucionDeCompra';

@Component({
  selector: 'sx-decs-grid',
  templateUrl: './decs-grid.component.html',
  styleUrls: ['./decs-grid.component.scss']
})
export class DecsGridComponent implements OnInit {

  @Input() decs: DevolucionDeCompra[] = [];

  constructor() { }

  ngOnInit() {
  }

}
