import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction, RegistrarSalidaAction } from 'app/logistica/store/actions/embarques.actions';
import { Embarque } from 'app/logistica/models/embarque';
import {TdDialogService} from '@covalent/core';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'sx-regresos-page',
  templateUrl: './regresos-page.component.html',
})
export class RegresosPageComponent implements OnInit {

  embarques$: Observable<Embarque[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: EmbarqueService,
    private router: Router
  ) { }

  ngOnInit() {
    this.embarques$ = this.store
      .select(fromRoot.getEmbarques)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getEmbarquesLoading);
    this.load();
  }

  search(folio: string) {
    this.store.dispatch(new SearchAction({'documento': folio}));
  }

  load() {
    this.store.dispatch(new SearchAction({'regresos':'regresos'}));
  }

  print(embarque: Embarque) {
    this.service.print(embarque.id)
    .subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/pdf'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }

  

  onRegreso(row) {

  }

}
