import { Component, OnInit, Input } from '@angular/core';

import { Facturista } from 'app/logistica/models/facturista';

@Component({
  selector: 'sx-facturistas-grid',
  templateUrl: './facturistas-grid.component.html',
})
export class FacturistasGridComponent implements OnInit {

  @Input() facturistas: Facturista[] = [];

  constructor() { }

  ngOnInit() {
  }

}
