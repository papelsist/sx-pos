import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {TdDialogService} from '@covalent/core';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/transportes.actions';
import { Transporte } from 'app/logistica/models/transporte';


@Component({
  selector: 'sx-transportes-page',
  templateUrl: './transportes-page.component.html',
})
export class TransportesPageComponent implements OnInit {

  transportes$: Observable<Transporte[]>;
  loading$: Observable<boolean>;


  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.transportes$ = this.store
      .select(fromRoot.getTransportes)
      .shareReplay();

    this.loading$ = this.store.select(fromRoot.getTransportesLoading);
    this.load();
  }

  search(folio: string) {
    // this.store.dispatch(new SearchAction({'documento': folio}));
  }

  load() {
    this.store.dispatch(new SearchAction());
  }

  get title() {
    return 'Catálogo de transportes';
  }

}
