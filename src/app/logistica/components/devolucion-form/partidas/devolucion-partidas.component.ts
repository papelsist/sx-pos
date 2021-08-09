import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';

import * as _ from 'lodash'; 

@Component({
  selector: 'sx-devolucion-partidas',
  templateUrl: 'devolucion-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class DevolucionPartidasComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas;

  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<number>();

  

  constructor(
    private _dialogService: TdDialogService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  scrollToStart() {
    console.log('Scroll to start');
  }
  scrollToLast() {

  }

  editar(index, row) {
    //this.edit.emit(row); 
    this._dialogService.openPrompt({
      message: `Registre la cantidad a devolver (max: ${row.cantidad}) `,
      value: row.cantidad,
    }).afterClosed().subscribe((value: any) => {
      
      if (value !== undefined ) {
        let cantidad = _.toSafeInteger(value);
        if(cantidad > row.cantidad || cantidad <= 0){
          cantidad = row.cantidad;
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