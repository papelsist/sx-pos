import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/logistica/store/reducers';
import {SearchAction} from 'app/logistica/store/actions/sectores.actions';
import {Sector} from 'app/logistica/models/sector';
import {TdDialogService} from '@covalent/core';
import { SectoresService } from 'app/logistica/services/sectores/sectores.service';


@Component({
  selector: 'sx-almacen-sectores-page',
  templateUrl: './sectores-page.component.html',
})
export class SectoresPageComponent implements OnInit {

  sectores$: Observable<Sector[]>;

  procesando = false;

  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: SectoresService
  ) { }

  ngOnInit() {
    this.load();
  }

  term = '';

  search(term: string) {
    this.term = term;
    this.load();
  }

  load() {
    this.sectores$ = this.service.list({term: this.term});
  }

  print(row: any) {
    
    this.service.print(row.id)
      .do( () => this.procesando = true)
      .finally( () => this.procesando = false)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.log(error2));
  }

  

}
