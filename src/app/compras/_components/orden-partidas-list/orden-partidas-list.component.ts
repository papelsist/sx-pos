import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import * as _ from 'lodash';

import { CompraDet } from 'app/models/compraDet';

@Component({
  selector: 'sx-orden-partidas-list',
  templateUrl: './orden-partidas-list.component.html',
  styles: ['']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenPartidasListComponent implements OnInit {
  @Input() parent: FormGroup;

  @Input() partidas: CompraDet[];

  @Output() delete = new EventEmitter<number>();

  @Output() edit = new EventEmitter<any>();

  constructor(private _dialogService: TdDialogService) {}

  ngOnInit() {}

  onDelete(index) {
    this.delete.emit(index);
  }

  onEdit(index) {
    this.edit.emit(index);
  }

  editar(index, row) {
    this._dialogService
      .openPrompt({
        message: `Registre la cantidad a solicitar `,
        value: row.cantidad
      })
      .afterClosed()
      .subscribe((value: any) => {
        if (value) {
          let cantidad = _.toSafeInteger(value);
          if (cantidad > row.cantidad || cantidad <= 0) {
            cantidad = row.cantidad;
          }
          this.partidas[index].solicitado = cantidad;
          const e = { row: index, cantidad: cantidad };
          this.edit.emit(e);
        }
      });
  }
}
