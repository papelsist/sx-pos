import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductUtils } from 'app/productos/services/productUtils';



@Component({
  selector: 'sx-qv-productos-btn',
  template: `
    <button type="button" md-icon-button (click)="openSelector()" mdTooltip="Consulta rápida de productos">
      <md-icon>layers</md-icon>
    </button>
  `,
  styles: []
})
export class QvProductosBtnComponent implements OnInit, OnDestroy {

  constructor(
    private prodUtils: ProductUtils
  ) { }

  ngOnInit() {}

  ngOnDestroy(): void {}

  /**
   *  Presenta un dialog para seleccionar un producto
   */
  openSelector() {
    this.prodUtils.openSelector();
  }

}
