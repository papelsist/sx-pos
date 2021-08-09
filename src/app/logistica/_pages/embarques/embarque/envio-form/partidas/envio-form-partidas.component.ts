import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-envio-form-partidas',
  templateUrl: 'envio-form-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .partidas-grid-container {
        height: 300px;
      }
      td {
        .tipo-documento {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          padding-left: 5px;
          color: gold;
        }
      }
    `
  ]
})
export class EnvioFormPartidasComponent implements OnInit {
  @Input() parent: FormGroup;

  @Input() partidas;

  @Input() disabled = false;

  @Output() remove = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  delete(index: number) {
    this.remove.emit(index);
  }

  modificar(row, value) {
    row.cantidad = value;
  }
}
