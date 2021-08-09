import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-pedido-toolbar',
  template: `
    <div layout="row" layout-align="start center" class="pad-left-sm pad-right-sm" layout-padding>
      <span  class="push-left-sm">
        <span class="md-title">Title here</span>
      </span>
      <span flex></span>
      <span>
      <button md-icon-button (click)="addCliente.emit()"  mdTooltip="Alta de cliente nuevo">
        <md-icon>person_add</md-icon>
      </button>
      </span>
    </div>
  `,
  styles: []
})
export class PedidoToolbarComponent implements OnInit {

  @Output() addCliente = new EventEmitter();
  
  @Output() buscar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  


}
