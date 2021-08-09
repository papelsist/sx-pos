import { Component, OnInit } from '@angular/core';

import { ProductUtils } from 'app/productos/services/productUtils';

@Component({
  selector: 'sx-prod-selector-btn',
  template: `
    <button type="button" md-icon-button (click)="select()" mdTooltip="Consulta rápida de productos">
      <md-icon>layers</md-icon>
    </button>
  `,
  styles: []
})
export class ProdSelectorButtonComponent implements OnInit {

  constructor(
    private productUtils: ProductUtils
  ) { }

  ngOnInit() {
  }

  select() {
    this.productUtils.openSelector();
  }

}
