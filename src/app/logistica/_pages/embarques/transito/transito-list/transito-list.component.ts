import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Embarque } from 'app/logistica/models/embarque';

@Component({
  selector: 'sx-transito-list',
  templateUrl: './transito-list.component.html',
  styleUrls: ['./transito-list.component.scss']
})
export class TransitoListComponent implements OnInit {

  @Input() embrques: Embarque[] = [];

  @Output() regreso = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  marcarRegreso(row) {
    this.regreso.emit(row);
  }

}
