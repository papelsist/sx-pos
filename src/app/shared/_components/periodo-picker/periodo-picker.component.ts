import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Periodo } from 'app/models/periodo';

import { PeriodoDialogComponent } from '../periodo-dialog/periodo-dialog.component';

@Component({
  selector: 'sx-periodo-picker',
  template: `
    <button md-icon-button [mdTooltip]="toolTip" (click)="seleccionar()"><md-icon>event</md-icon></button>
  `,
  styles: [``]
})
export class PeriodoPickerComponent implements OnInit {
  @Input() toolTip = 'Cambiar el periodo';

  @Input() periodo = new Periodo();
  @Output() change = new EventEmitter();

  constructor(private dialog: MdDialog) {}

  ngOnInit() {}

  seleccionar() {
    this.dialog
      .open(PeriodoDialogComponent, {
        data: { periodo: this.periodo }
      })
      .afterClosed()
      .subscribe(res => {
        if (res !== null) {
          this.change.emit(res);
        }
      });
  }
}
