import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Transformacion } from "app/logistica/models/transformacion";
import { TransformacionesService } from "app/logistica/services/transformaciones/transformaciones.service";


@Component({
  selector: 'sx-transformaciones-page',
  templateUrl: './transformaciones-page.component.html',
  styles: []
})
export class TransformacionesPageComponent implements OnInit {
  
  transformaciones$: Observable<any>;
  term = '';
  processing = false;

  constructor(
    private service: TransformacionesService
  ) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.processing = true;
    this.transformaciones$ = this.service
    .list(this.term)
    .catch(error => this.handleError(error))
    .finally( () => this.processing = false);
  }

  search(term){
    this.term = term;
    this.load();
  }

  handleError(err) {
    console.log(err);
    return Observable.empty();
  }

}
