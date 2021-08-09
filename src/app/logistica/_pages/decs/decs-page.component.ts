import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/decs.actions';
import { DevolucionDeCompra } from 'app/logistica/models/devolucionDeCompra';

@Component({
  selector: 'sx-coms-page',
  templateUrl: './decs-page.component.html',
})
export class DecsPageComponent implements OnInit {

  decs$: Observable<DevolucionDeCompra[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.LogisticaState>
  ) { }

  ngOnInit() {
    this.decs$ = this.store
      .select(fromRoot.getDecs)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getDecsLoading);
  }

  search(folio: string) {
    this.store.dispatch(new SearchAction(folio));
  }

}
