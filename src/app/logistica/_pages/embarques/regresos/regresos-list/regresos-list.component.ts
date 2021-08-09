import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Embarque } from 'app/logistica/models/embarque';

@Component({
  selector: 'sx-regresos-list',
  templateUrl: './regresos-list.component.html',
  styleUrls: ['./regresos-list.component.scss']
})
export class RegresosListComponent implements OnInit {

  @Input() embrques: Embarque[] = [];

  @Output() regreso = new EventEmitter();

  @Output() print = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  

}
