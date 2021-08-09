import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FacturaSearchDialogComponent } from './factura-search-dialog.component';

@Component({
  selector: 'sx-factura-search',
  template: `
    <button md-icon-button mdTooltip="Buscar factura" (click)="search()">
      <md-icon>my_library_books</md-icon> 
    </button>
  `,
})
export class FacturaSearchComponent implements OnInit {

  constructor(
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
  }

  search() {
    const dialogRef = this.dialog.open(FacturaSearchDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Localizando factura: ', result);
      }
    });
  }

}
