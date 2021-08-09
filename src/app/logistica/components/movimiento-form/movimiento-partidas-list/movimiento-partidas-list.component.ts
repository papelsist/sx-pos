import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TdDialogService } from '@covalent/core';

import { MovimientoDet } from "app/logistica/models/movimientoDet";

@Component({
  selector: 'sx-movimiento-partidas-list',
  templateUrl: './movimiento-partidas-list.component.html',
  styleUrls: ['./movimiento-partidas-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovimientoPartidasListComponent implements OnInit {
  
  @Input() parent: FormGroup

  @Input() editable = true;
  
  @Input() partidas: MovimientoDet[];

  @Output() delete = new EventEmitter();
  
  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  onDelete(index: number){
    this.delete.emit(index);
  }

  mostrarCortes(row) {
    this._dialogService.openAlert({
      message: `Cortes: ${row.cortes}  Instrucción: ${row.instrucion}`,
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Cortes', //OPTIONAL, hides if not provided
      closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
    });
  }

  

}
