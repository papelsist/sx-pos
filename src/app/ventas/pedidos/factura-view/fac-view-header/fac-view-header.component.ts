import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {Venta, Cliente} from 'app/models';

@Component({
  selector: 'sx-fac-view-header',
  templateUrl: './fac-view-header.component.html',
  styleUrls: ['./fac-view-header.component.scss']
})
export class FacViewHeaderComponent implements OnInit {

  @Input() venta: Venta;
  @Output() mostrarXml = new EventEmitter();
  @Output() cancelar = new EventEmitter();
  @Output() cambiarCfdi = new EventEmitter();
  

  constructor() { }

  ngOnInit() {
  }

  get cliente(): Cliente {
    return this.venta.cliente;
  }

}
