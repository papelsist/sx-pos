import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/reducers';

@Component({
  selector: 'sx-sucursal-label',
  templateUrl: './sucursal-label.component.html',
  styleUrls: ['./sucursal-label.component.scss']
})
export class SucursalLabelComponent implements OnInit {
  
  sucursal$: Observable<string>;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal).pluck('nombre');
  }

}
