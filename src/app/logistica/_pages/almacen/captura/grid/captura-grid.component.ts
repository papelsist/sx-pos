import { Component, OnInit, Input } from '@angular/core';

import {Conteo} from 'app/logistica/models/conteo';

@Component({
  selector: 'sx-captura-grid',
  templateUrl: './captura-grid.component.html',
  styleUrls: ['./captura-grid.component.scss']
})
export class CapturaGridComponent implements OnInit {

  @Input() conteos: Conteo[] = [];

  constructor() { }

  ngOnInit() {
  }

}
