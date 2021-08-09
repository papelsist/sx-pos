import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {SolicitudDeTraslado} from 'app/logistica/models/solicitudDeTraslado';


@Component({
  selector: 'sx-solicitudes-list',
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.scss']
})
export class SolicitudesListComponent implements OnInit {

  @Input() solicitudes = [];

  @Output() print = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

}
