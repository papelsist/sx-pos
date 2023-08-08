import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-transito-form-partidas',
  templateUrl: 'transito-form-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class TransitoFormPartidasComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas;

  @Input() disabled = false;

  @Output() arrivo = new EventEmitter<number>();
  @Output() recepcion = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() completo = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onRecepcion(index: number) {
    this.recepcion.emit(index);
  }
  onArribo(index: number) {
    this.arrivo.emit(index);
  }
  onDelete(index: number) {
    this.remove.emit(index);
  }

  onChange(index: number) {
      console.log('Cambio ', index);
      this.completo.emit(index)
  }



}
