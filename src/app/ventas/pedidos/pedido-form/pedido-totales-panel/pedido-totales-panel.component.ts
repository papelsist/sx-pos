import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'sx-pedido-totales-panel',
  templateUrl: './pedido-totales-panel.component.html',
  styleUrls: ['./pedido-totales-panel.component.css']
})
export class PedidoTotalesPanelComponent implements OnInit {

  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get importe() {
    return this.parent.get('importe').value;
  }

  isDolares() {
    const usd = this.parent.get('moneda');
    if ( usd && usd.value === 'USD') {
      return true
    }
    // return this.parent.get('moneda').value === 'USD'
    return false;
  }

  get descuento(){
    const desc =  this.parent.get('descuento').value;
    return desc/100;
  }

}
