import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Conteo} from 'app/logistica/models/conteo';

@Component({
  selector: 'sx-conteo-grid',
  templateUrl: './conteo-grid.component.html',
  styleUrls: ['./conteo-grid.component.scss']
})
export class ConteoGridComponent implements OnInit {

  @Input() conteos: Conteo[] = [];

  @Output() print = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
