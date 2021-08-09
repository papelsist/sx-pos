import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Sector} from 'app/logistica/models/sector';

@Component({
  selector: 'sx-sectores-grid',
  templateUrl: './sectores-grid.component.html',
  styleUrls: ['./sectores-grid.component.scss']
})
export class SectoresGridComponent implements OnInit {

  @Input() sectores: Sector[] = [];

  @Output() print = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


}
