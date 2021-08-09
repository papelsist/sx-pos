import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';

import * as _ from 'lodash'; 

@Component({
  selector: 'sx-dec-partidas',
  templateUrl: 'dec-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class DecPartidasComponent implements OnInit {

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
    // console.log(`Editando: `, row);
    const disponible = row.recepcionDeCompraDet.disponible;
    this._dialogService.openPrompt({
      message: `Registre la cantidad a recibit (max: ${disponible}) `,
      value: row.cantidad,
    }).afterClosed().subscribe((value: any) => {
      
      if (value !== undefined ) {
        let cantidad = _.toSafeInteger(value);
        if (cantidad > disponible) {
          cantidad = disponible;
        }
        const e = { row: index, cantidad: cantidad};
        this.edit.emit(e);
      }
    });
  }

  delete(index: number){
    this.remove.emit(index);
  }
}