import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from 'app/traslados/services/solicitudes.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';

@Component({
  selector: 'sx-solicitudes-page',
  templateUrl: './solicitudes-page.component.html'
})
export class SolicitudesPageComponent implements OnInit {

  procesando = false;

  solicitudes$: Observable<SolicitudDeTraslado[]>;

  search$ = new BehaviorSubject<string>('');

  reload$ = new Subject<boolean>();

  constructor(
    private service: SolicitudesService
  ) {
    const obs1 = this.search$.asObservable()
      .map( term => _.toInteger(term))
      .distinctUntilChanged()
      .debounceTime(300);

    const obs2 = this.reload$.asObservable().startWith(true)

    this.solicitudes$ = Observable.combineLatest(obs1, obs2, (term, reload) => {
      return term ? term : null;
    }).switchMap( documento => this.service
      .list(documento)
      .do( () => this.procesando = true)
      .delay(300)
      .finally( () => this.procesando = false));
   }

  ngOnInit() {
    this.load();
  }

  load() {
    this.reload$.next(true);
  }

  search(term: string) {
    this.search$.next(term);
  }

  print(sol: SolicitudDeTraslado) {
    this.procesando = true;
    this.service.print(sol.id)
      .finally( () => this.procesando = false)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.error(error2));
  }

}
