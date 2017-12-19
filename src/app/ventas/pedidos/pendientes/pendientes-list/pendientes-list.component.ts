import {Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
import { Venta } from 'app/models';


@Component({
  selector: 'sx-pedidos-pendientes-list',
  templateUrl: './pendientes-list.component.html',
  styleUrls: ['./pendientes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendientesListComponent implements OnInit {

  @Input() pedidos: Venta[];

  @Output() edit = new EventEmitter<any>();

  @Output() facturar = new EventEmitter<any>();

  @Output() envio = new EventEmitter<any>();

  @Output() print = new EventEmitter<any>();

  @Output() generarVale = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onEdit(pedido: Venta) {
    this.edit.emit(pedido);
  }

  onFacturar(pedido: Venta) {
    this.facturar.emit(pedido);
  }

  

}