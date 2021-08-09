import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChange,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { ITdDataTableColumn, TdDataTableComponent } from '@covalent/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { VentaDet } from 'app/models';

@Component({
  selector: 'sx-pedido-partidas-grid',
  templateUrl: './partidas-grid.component.html',
  styleUrls: ['./partidas-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  //encapsulation: ViewEncapsulation.None
})
export class PartidasGridComponent implements OnInit {
  @Output() delete = new EventEmitter();

  @Output() edit = new EventEmitter();

  @Output() cambioDePrecio = new EventEmitter();

  @Input() partidas = [];

  @Input() parent: FormGroup;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  refresh() {
    this.cd.detectChanges();
  }

  isEditable(row: VentaDet) {
    const MANIOBRAS = ['CORTE', 'MANIOBRA', 'MANIOBRAF'];
    return !_.includes(MANIOBRAS, row.producto.clave);
  }

  isEliminable(row: VentaDet) {
    const MANIOBRAS = ['CORTE', 'MANIOBRA'];
    return !_.includes(MANIOBRAS, row.producto.clave);
  }

  get invalid() {
    return this.parent.hasError('sinPartidas');
  }
}
