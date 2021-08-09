import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MovimientosService } from "app/logistica/services/movimientos/movimientos.service";
import { Movimiento } from "app/logistica/models/movimiento";

@Component({
  selector: 'sx-movimientos-page',
  templateUrl: './movimientos-page.component.html',
  styles: []
})
export class MovimientosPageComponent implements OnInit {
  
  movimientos$: any;
  term = '';
  procesando = false;

  constructor(
    private service: MovimientosService
  ) { }

  ngOnInit() {
     this.load();
  }
  
  load() {
    this.procesando = true;
    this.movimientos$ = this.service
    .list(this.term)
    .catch( err => this.handleError(err))
    .finally( () => this.procesando = false);
  }

  search(term){
    this.term = term;
    this.load();
  }

  handleError(err) {
    console.log('Error: ', err);
    return Observable.empty();
  }

}
