import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/devoluciones.actions';
import { DevolucionDeVenta } from 'app/logistica/models/devolucionDeVenta';
import { DevolucionesService } from '../../services/devoluciones/devoluciones.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sx-devoluciones-page',
  templateUrl: './devoluciones-page.component.html',
})
export class DevolucionesVentaPageComponent implements OnInit {

  devoluciones$: Observable<DevolucionDeVenta[]>;
  loading$: Observable<boolean>;  
  
  procesando = false;

    search$ = new BehaviorSubject<string>('');

  reload$ = new Subject<boolean>();


  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private service:DevolucionesService
  ) {
    const obs1 = this.search$
    .asObservable()
    .distinctUntilChanged()
    .debounceTime(300);
    
    const obs2 = this.reload$.asObservable().startWith(true);
    
    this.devoluciones$ = Observable.combineLatest(obs1, obs2, (term, reload) => {
      return term ? term : null;
    }).switchMap(term =>
      this.service
        .list(term)
        //.do( () => this.procesando = true)
        .delay(300)
        .finally(() => (this.procesando = false))
    );

  }

  ngOnInit() {
    this.devoluciones$ = this.store
      .select(fromRoot.getDevoluciones)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getDevolucionesLoading);
  }

  search(folio: string) {
   
    this.store.dispatch(new SearchAction({'documento': folio}));

    
  }

}
