import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Morralla } from 'app/caja/models/morralla';
import {MorrallaService} from 'app/caja/services/morralla.service';
import {MorrallaDialogComponent} from './morralla-dialog/morralla-dialog.component';

@Component({
  selector: 'sx-corte-morralla',
  templateUrl: './corte-morralla.component.html',
  styleUrls: ['./corte-morralla.component.scss']
})
export class CorteMorrallaComponent implements OnInit {

  movimientos: Morralla[] = [];

  constructor(
    public dialog: MdDialog,
    private service: MorrallaService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.list().subscribe(movimientos => {
      this.movimientos = movimientos
    } , error => console.error(error));
  }

  addMorralla() {
    const params = {}
    this.openDialog(MorrallaDialogComponent, params);
  }

  openDialog(component, params: {} = {}) {
    const dialogRef = this.dialog.open(component, {
      data: params
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(morralla) {
    console.log('Salvando morralla de caja: ', morralla);
    this.service.save(morralla).subscribe( res => {
      console.log('Registro de movimiento en morralla fijo exitosamente salvado: ', res);
      this.load();
    }, error => console.error('Error salvando morralla ', error));
  }

  onDelete(morralla: Morralla) {
    this.service.delete(morralla.id).subscribe( res => {
      console.log('Registro de movimiento de morralla eliminado: ', res);
      this.load();
    }, error => console.error('Error salvando morralla ', error));
  }

}

