import { Component, OnInit, Input } from '@angular/core';

import { Chofer } from 'app/logistica/models/chofer';

@Component({
  selector: 'sx-choferes-grid',
  templateUrl: './choferes-grid.component.html',
})
export class ChoferesGridComponent implements OnInit {

  @Input() choferes: Chofer[] = [];

  constructor() { }

  ngOnInit() {
  }

}
