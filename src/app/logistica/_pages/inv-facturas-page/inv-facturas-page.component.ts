import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { Venta } from '@siipapx/models';
import { FacturasService } from '@siipapx/logistica/services/facturas.service';

@Component({
  selector: 'sx-inv-facturas-page',
  templateUrl: './inv-facturas-page.component.html',
  styles: [`
    .page {
      height: 85vh;
    }
  `]
})
export class InvFacturasPageComponent implements OnInit {

  facturas$: Observable<Venta[]>;

  term = '';
  procesando = false;
  _canceladas = false;

  selected$: Observable<any>;

  columns: ITdDataTableColumn[] = [
    { name: 'tipo',  label: 'Tipo', sortable: true, width: 30 },
    { name: 'documento',  label: 'Factura', sortable: true, width: 30 },
    { name: 'cliente.nombre', label: 'Cliente', filter: true, width: 350 },
    { name: 'fecha', label: 'Fecha', hidden: false, width: 10},
    { name: 'total', label: 'Total', width: 100},
    { name: 'comentario', label: 'Comentario', width: 300},
    // { name: 'cancelada', label: 'Cancelada', width: 70}
    
  ];

  partidasColumns: ITdDataTableColumn[] = [
    { name: 'noIdentificacion',  label: 'Clave', sortable: true, width: 30 },
    { name: 'descripcion', label: 'Producto', filter: true, width: 350 },
    { name: 'unidad', label: 'Unidad', filter: true, width: 20 },
    { name: 'cantidad', label: 'Cantidad', hidden: false, width: 70},
    { name: 'valorUnitario', label: 'Precio', width: 100},
    { name: 'importe', label: 'Importe', width: 100},
    { name: 'descuento', label: 'Descuento', width: 100},
    // { name: 'subtotal', label: 'Impuesto', width: 100},
    // { name: 'comentario', label: 'Comentario'}
    
  ];

  constructor(private service: FacturasService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.procesando = true;
    this.selected$ = Observable.empty();
    this.facturas$ = this.service.list({term: this.term, canceladas: this.canceladas })
      .catch( err => {
        console.log('Error: ', err);
        return Observable.of([]);
      })
      .finally( () => this.procesando = false)
  }

  search(term) {
    this.term = term;
    this.load();
  }

  rowClick($event){
    const row: any = $event.row;
    this.selected$ = this.service
      .getPartidas(row.id)
      .catch(err => Observable.of([]));
    /*
    if (row.cancelada) {
      this.selected$ = this.service.getPartidas(row.id);
    } else {
      this.selected$ = this.service.get(row.id).pluck('partidas');
    }
    */
    
  }

  get canceladas() {
    return this._canceladas;
  }
  set canceladas(val) {
    this._canceladas = val;
    this.load();
  }

  

}
