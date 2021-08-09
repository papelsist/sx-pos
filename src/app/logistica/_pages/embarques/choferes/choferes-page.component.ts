import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {TdDialogService} from '@covalent/core';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/choferes.actions';
import { Chofer } from 'app/logistica/models/chofer';


@Component({
  selector: 'sx-choferes-page',
  templateUrl: './choferes-page.component.html',
})
export class ChoferesPageComponent implements OnInit {

  choferes$: Observable<Chofer[]>;
  loading$: Observable<boolean>;


  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.choferes$ = this.store
      .select(fromRoot.getFacturistas)
      .shareReplay();

    this.loading$ = this.store.select(fromRoot.getChoferesLoading);
    this.load();
  }

  search(folio: string) {
    // this.store.dispatch(new SearchAction({'documento': folio}));
  }

  load() {
    this.store.dispatch(new SearchAction());
  }

  get title() {
    return 'Catálogo de choferes';
  }

}
