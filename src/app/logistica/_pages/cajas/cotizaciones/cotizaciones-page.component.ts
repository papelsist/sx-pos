import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/logistica/store/reducers';
import {SearchAction} from 'app/logistica/store/actions/sectores.actions';
// import {Sector} from 'app/logistica/models/sector';
import {TdDialogService} from '@covalent/core';
// import { SectoresService } from 'app/logistica/services/sectores/sectores.service';
import { CotizacionCaja } from '../../../../models/cotizacionCaja';
import { CajasService } from '../../../services/cajas/cajas.service';
import { Producto } from '../../../../models/producto';


@Component({
  selector: 'sx-cotizaciones-page',
  templateUrl: './cotizaciones-page.component.html',
})
export class CotizacionesPageComponent implements OnInit {


  cotizaciones$: Observable<CotizacionCaja[]>;

  producto$: Observable<any>

  procesando = false;

  term = '';

  constructor(
    private service: CajasService
  ) { }

  ngOnInit() {
      this.load();
  }


  search(term: string) {
    this.term = term;
    this.load();
  }

  load() {
      this.cotizaciones$ = this.service.list({term: this.term});
  }

  print(row: any) {
    this.service
      .print(row)
      .subscribe(
        res => {
           const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },
        error2 => console.error(error2)
      );
  }
}
