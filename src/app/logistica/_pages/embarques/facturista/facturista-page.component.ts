import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {TdDialogService} from '@covalent/core';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/facturistas.actions';
import { Facturista } from 'app/logistica/models/facturista';


@Component({
  selector: 'sx-facturista-page',
  templateUrl: './facturista-page.component.html',
})
export class FacturistaPageComponent implements OnInit {

  facturistas$: Observable<Facturista[]>;
  loading$: Observable<boolean>;


  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.facturistas$ = this.store
      .select(fromRoot.getFacturistas)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getFacturistasLoading);
    this.load();
  }

  search(folio: string) {
    // this.store.dispatch(new SearchAction({'documento': folio}));
  }

  load() {
    this.store.dispatch(new SearchAction());
  }

  get title() {
    return 'Catálogo de facturistas';
  }

}
