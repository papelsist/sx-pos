import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';

import * as _ from 'lodash';

@Component({
  selector: 'sx-com-partidas',
  templateUrl: 'com-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class ComPartidasComponent implements OnInit {
  @Input() parent: FormGroup;

  @Input() partidas;

  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<number>();

  constructor(
    private _dialogService: TdDialogService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  scrollToStart() {
    console.log('Scroll to start');
  }
  scrollToLast() {}

  editar(index, row) {
    const recibido = row.compraDet.recibido;
    const pendiente = row.compraDet.pendiente;
    let message = 'Registrar la cantidad a recibir';
    if (recibido > 0) {
      message = `Registrar la cantidad a recibir (max: ${pendiente})`;
    }
    this._dialogService
      .openPrompt({
        message: message,
        value: row.cantidad
      })
      .afterClosed()
      .subscribe((value: any) => {
        if (value !== undefined) {
          let cantidad = _.toSafeInteger(value);
          if (recibido > 0 && cantidad > pendiente) {
            // cantidad = pendiente;
          }
          const e = { row: index, cantidad: cantidad };
          this.edit.emit(e);
        }
      });
  }

  delete(index: number) {
    this.remove.emit(index);
  }
}
