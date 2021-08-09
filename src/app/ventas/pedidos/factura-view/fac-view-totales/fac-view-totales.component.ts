import { Component, OnInit, Input } from '@angular/core';

import {Venta} from 'app/models';

@Component({
  selector: 'sx-fac-view-totales',
  templateUrl: './fac-view-totales.component.html',
  styleUrls: ['./fac-view-totales.component.scss']
})
export class FacViewTotalesComponent implements OnInit {

  @Input() venta: Venta

  constructor() { }

  ngOnInit() {
  }

}
