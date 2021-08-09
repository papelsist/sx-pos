import { Component, OnInit, Input } from '@angular/core';
import { TdDataTableService, ITdDataTableColumn } from '@covalent/core';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-generadas-page',
  templateUrl: './generadas-page.component.html'
})
export class GeneradasPageComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'Documento', numeric: true, width: 10 },
    { name: 'pedido',  label: 'Pedido', numeric: true, width: 10 },
    { name: 'fecha',  label: 'Fecha', width: 10},
    { name: 'nombre',  label: 'Cliente', width: 400},
    { name: 'total',  label: 'Total', width: 10},
    { name: 'saldo',  label: 'Saldo', width: 10},
    { name: 'cuentaPorCobrar',  label: 'CFDI', width: 20},
    { name: 'formaDePago',  label: 'F.Pago'},
  ];

  data: any[] = [];

  search$ = new BehaviorSubject<string>('');

  procesando = false;

  facturas$: Observable<Venta[]>;

  constructor(
    private _dataTableService: TdDataTableService,
    private service: CajaService
  ) {

    this.facturas$ = this.search$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap( term => {
        this.procesando = true
        return this.service
          .cobradas(term)
          .finally( () => this.procesando = false)
      });

    this.facturas$
    .subscribe( facturas => {
      this.data = facturas;
      }, error => console.log('Error: ', error)
    );
  }
 
  ngOnInit(): void {
    
  }

  load() {
    this.search$.next(null);
  }

  search(term: string): void {
    this.search$.next(term);
  }

}

