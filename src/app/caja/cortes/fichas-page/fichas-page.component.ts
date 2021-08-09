import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { ITdDataTableColumn } from '@covalent/core';

import { Ficha } from 'app/caja/models/ficha';
import { FichaService } from 'app/caja/services/ficha.service';
import { SelectorFechaComponent } from 'app/shared/_components/selector-fecha/selector-fecha.component';


@Component({
  selector: 'sx-fichas-page',
  templateUrl: './fichas-page.component.html',
  styles: []
})
export class FichasPageComponent implements OnInit {

  fichas$: Observable<Ficha[]>;
  
  procesando = false;

  fecha = new Date();

  columns: ITdDataTableColumn[] = [
    { name: 'folio',  label: 'Folio', width: 40},
    { name: 'tipoDeFicha', label: ',Tipo'},
    { name: 'origen', label: 'Origen'},
    { name: 'fecha', label: 'Fecha'},
    { name: 'total', label: 'Fecha'},
    { name: 'comentario', label: 'Comentario'},
  ];

  constructor(
    private servie: FichaService,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.fichas$ = this.servie
      .list(this.fecha)
      .do( () => this.procesando = true)
      .delay(2000)
      .finally( () => this.procesando = false);
  }

  cambiarFecha(fecha) {
    const dialogRef = this.dialog.open(SelectorFechaComponent, {
      data: this.fecha
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fecha = result;
        this.load();
      }
    });
  }

  search(term) {
    console.log('Buscando ficha: ', term);
  }


}
