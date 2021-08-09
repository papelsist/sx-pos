import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { Producto } from 'app/models';
import { ProductoService } from 'app/productos/services/producto.service';

@Component({
  selector: 'sx-prod-field',
  templateUrl: './prod-field.component.html',
  styleUrls: ['./prod-field.component.scss']
})
export class ProdFieldComponent implements OnInit {
  @Input() required = false;

  @Input() activos: boolean = false;

  @Input() deLinea: boolean = false;

  @Output() selection = new EventEmitter<Producto>();

  productos$: Observable<Producto[]>;

  searchControl = new FormControl();

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productos$ = this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(term => _.isString(term))
      .switchMap(term => {
        if (term) {
          return this.productoService.list(term, {
            activos: this.activos,
            deLinea: this.deLinea
          });
        } else {
          return Observable.of([]);
        }
      });
  }

  displayFn(producto: Producto) {
    return producto ? `${producto.descripcion} (${producto.clave})` : '';
  }

  select($event) {
    this.selection.emit(this.searchControl.value);
  }
}
