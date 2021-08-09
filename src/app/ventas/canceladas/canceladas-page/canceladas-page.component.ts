import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdLoadingService } from '@covalent/core';

import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-canceladas-page',
  templateUrl: './canceladas-page.component.html',
  styleUrls: ['./canceladas-page.component.scss']
})
export class CanceladasPageComponent implements OnInit {

  facturas$: Observable<Venta[]>;
  
  procesando = false;
  
  search$ = new BehaviorSubject<string>('');

  constructor(
    private service: PedidosService,
    private loadingService: TdLoadingService,
  ) {

    this.facturas$ = this.search$
    .debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => {
      return this.service.canceladas(term)
        .do( () => this.procesando = true)
        .finally( () => this.procesando = false)
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.search('');
  }

  search(term: string) {
    this.search$.next(term);
  }

}
