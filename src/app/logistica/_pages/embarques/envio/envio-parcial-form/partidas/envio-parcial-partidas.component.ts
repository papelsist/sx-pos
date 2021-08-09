import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';
import * as _ from 'lodash';

@Component({
  selector: 'sx-envio-parcial-partidas',
  templateUrl: 'envio-parcial-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class EnvioParcialPartidasComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas;

  @Output() edit = new EventEmitter<any>();

  @Output() remove = new EventEmitter<number>();

  constructor(
    private _dialogService: TdDialogService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  editar(index, row) {
    const vendido = Math.abs(row.ventaDet.cantidad );
    const enviado = row.ventaDet.enviado ;
    const max = vendido - enviado;
    this._dialogService.openPrompt({
      message: `Registre la cantidad a enviar (max: ${max}) `,
      value: row.cantidad,
    }).afterClosed().subscribe((value: any) => {

      if (value !== undefined ) {
        let cantidad = _.toSafeInteger(value);
        if (cantidad > max || cantidad <= 0) {
          cantidad = max;
        }
        const e = { row: index, cantidad: cantidad};
        row.cantidad = cantidad;
        this.edit.emit(e);
      }
    });
  }

  delete(index: number) {
    this.remove.emit(index);
  }
}
