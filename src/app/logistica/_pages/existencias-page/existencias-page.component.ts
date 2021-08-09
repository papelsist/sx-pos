import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Existencia2Service } from 'app/logistica/services/existencias2.service';
import { Existencia } from 'app/models';

@Component({
  selector: 'sx-existencias-page',
  templateUrl: './existencias-page.component.html',
  styles: ['']
})
export class ExistenciasPageComponent implements OnInit {
  selected = undefined;

  existencias$: Observable<Existencia[]>;
  term = '';
  procesando = false;

  ejercicio = 2018;
  mes = 2;

  constructor(private service: Existencia2Service) {}

  ngOnInit() {
    this.load();
  }

  load() {
    const hoy = new Date();
    this.mes = hoy.getMonth() + 1;
    this.ejercicio = hoy.getFullYear();
    console.log('Mes: ', this.mes);
    this.procesando = true;
    this.existencias$ = this.service
      .list({ term: this.term, ejercicio: this.ejercicio, mes: this.mes })
      .catch(err => this.handleError(err))
      .finally(() => (this.procesando = false));
  }

  handleError(err) {
    console.log(err);
    return Observable.empty<Existencia[]>();
  }

  search(term) {
    this.term = term;
    this.load();
  }

  recortePorDetalle() {
    this.service
      .recortePorDetalle()
      .do(() => (this.procesando = true))
      .finally(() => (this.procesando = false))
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },
        error2 => console.log(error2)
      );
  }
}
