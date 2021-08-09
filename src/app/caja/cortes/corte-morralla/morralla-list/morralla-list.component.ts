import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Morralla } from 'app/caja/models/morralla';

@Component({
  selector: 'sx-morralla-list',
  templateUrl: './morralla-list.component.html',
  styleUrls: ['./morralla-list.component.scss']
})
export class MorrallaListComponent implements OnInit {

  @Input() movimientos: Morralla[] = [];

  @Output() delete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }
}
