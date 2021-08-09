import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-conteo-form-partidas',
  templateUrl: 'conteo-form-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class ConteoFormPartidasComponent implements OnInit {

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
    console.log('Modificando row:', row);
    console.log('Cantidad: ', value);
    row.cantidad = value;
  }
}
