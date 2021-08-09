import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Venta, Cliente} from 'app/models';

@Component({
  selector: 'sx-fac-show-header',
  templateUrl: './fac-show-header.component.html',
  styleUrls: ['./fac-show-header.component.scss']
})
export class FacShowHeaderComponent implements OnInit {

  @Input() venta: Venta;
  @Output() mostrarXml = new EventEmitter();
  @Output() cancelar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get cliente(): Cliente {
    return this.venta.cliente;
  }

  consultarCfdi() {
    console.log('Consultando CFDI');
  }

}

