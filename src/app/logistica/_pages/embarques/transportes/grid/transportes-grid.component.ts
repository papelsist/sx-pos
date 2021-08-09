import { Component, OnInit, Input } from '@angular/core';

import { Transporte } from 'app/logistica/models/transporte';

@Component({
  selector: 'sx-transportes-grid',
  templateUrl: './transportes-grid.component.html',
})
export class TransportesGridComponent implements OnInit {

  @Input() transportes: Transporte[] = [];

  constructor() { }

  ngOnInit() {
  }

}
