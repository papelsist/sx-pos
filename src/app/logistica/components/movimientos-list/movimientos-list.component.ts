import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Movimiento } from "app/logistica/models/movimiento";

@Component({
  selector: 'sx-movimientos-list',
  templateUrl: './movimientos-list.component.html',
  styleUrls: ['./movimientos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovimientosListComponent implements OnInit {

  @Input() movimientos: Array<Movimiento> = [];

  @Output() selection = new EventEmitter<Movimiento>();

  selected: Movimiento = undefined;

  constructor() { }

  ngOnInit() {
  }

  select(row) {
    this.selected = row;
    this.selection.emit(row);
  }

  isSelected(row) {
    if(this.selected !== undefined)
      return row.id === this.selected;
    else {
      return false;
    }
  }



}
