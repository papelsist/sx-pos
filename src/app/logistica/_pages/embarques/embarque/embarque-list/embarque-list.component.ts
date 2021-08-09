import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';

import { Embarque } from 'app/logistica/models/embarque';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-embarque-list',
  templateUrl: './embarque-list.component.html',
  styleUrls: ['./embarque-list.component.scss']
})
export class EmbarqueListComponent implements OnInit {

  @Input() embrques: Embarque[] = [];

  @Output() salida = new EventEmitter();

  @Output() delete = new EventEmitter();

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
  }

  marcarSalida(row) {
    this.salida.emit(row);
  }

  eliminar(embarque: Embarque) {
    if(embarque.numeroDePartidas > 0) {
      this.openAlert('Embarque con envios registrados no se puede eliminar');
    } else {
      this.doDelete(embarque);
    }
    
  }

  openAlert(message: string): void {
    this._dialogService.openAlert({
      message: message,
      viewContainerRef: this._viewContainerRef,
      title: 'Error',
      closeButton: 'Cerrar',
    });
  }

  doDelete(embarque: Embarque){
    this._dialogService.openConfirm({
      message: `Eliminar embarque  ${embarque.documento} ?` ,
      viewContainerRef: this._viewContainerRef,
      title: 'Embarques',
      cancelButton: 'Cancelar',
      acceptButton: 'Eliminar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.delete.emit(embarque);
      }
    });
  }


}
