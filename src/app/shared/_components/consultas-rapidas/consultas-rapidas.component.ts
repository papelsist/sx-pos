import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'sx-consultas-rapidas',
  templateUrl: './consultas-rapidas.component.html',
  styles: []
})
export class ConsultasRapidasComponent implements OnInit {

  consultas$: Observable<Array<any>>;

  constructor() { }

  ngOnInit() {
    this.consultas$ = Observable.of([
      { path: '/crm/clientes', nombre: 'Clientes', descripcion: 'Consulta rápida de clientes', icon: 'people'}
    ])
  }

}
