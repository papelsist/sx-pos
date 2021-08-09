import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-facturas-cre-list',
  templateUrl: './facturas-cre-list.component.html',
  styleUrls: ['./facturas-cre-list.component.scss']
})
export class FacturasCreListComponent implements OnInit {

  @Input() pedidos: Venta[];

  @Output() cancelar = new EventEmitter<any>();

  @Output() facturar = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}

