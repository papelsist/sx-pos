import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-grid-vale-partidas',
  templateUrl: 'partidas-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class ValeGridPartidasComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas;

  @Input() disabled = false;

  @Output() remove = new EventEmitter<number>();

  @Output() partidasUpdate = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }


  delete(index: number) {
    this.remove.emit(index);
  }

  modificar( row, value) {
    row.cantidad = Number(value);
    this.partidasUpdate.emit(this.partidas)
  }


}
