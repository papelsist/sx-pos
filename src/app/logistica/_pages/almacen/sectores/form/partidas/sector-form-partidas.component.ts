import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'sx-sector-form-partidas',
  templateUrl: 'sector-form-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class SectorFormPartidasComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas;

  @Input() disabled = false;

  @Output() remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  delete(index: number) {
    this.remove.emit(index);
  }

  modificar( row, value) {
    console.log(`Aignando ${value} a ${row.producto.clave}`)
    row.indice = _.toNumber(value);
  }
}
