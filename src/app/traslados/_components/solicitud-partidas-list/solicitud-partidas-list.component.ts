import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { TdDialogService } from '@covalent/core';


import * as _ from 'lodash'; 

@Component({
  selector: 'sx-solicitud-partidas-list',
  templateUrl: './solicitud-partidas-list.component.html',
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class SolicitudPartidasListComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas = [];

  @Output() remove = new EventEmitter<number>();

  @Output() edit = new EventEmitter<any>();

  constructor(private _dialogService: TdDialogService,) { }

  ngOnInit() { }

  delete(index: number) {
    this.remove.emit(index);
  }

  onEdit(index, row){
    console.log("Editando la partida "+index);

    this._dialogService.openPrompt({
      message: `Solicitar `,
     value: row.solicitado
    }).afterClosed().subscribe((value: any) => {
      if (value !== undefined ) {
        let solicitado = _.toSafeInteger(value);
        const e = { row: index, solicitado: solicitado};
        this.edit.emit(e);
      }
    });
  }

}
