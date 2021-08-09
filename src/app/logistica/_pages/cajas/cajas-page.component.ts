import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import {MdDialog} from '@angular/material';
import { SectoresService } from '@siipapx/logistica/services/sectores/sectores.service';
import { RecPorLineaComponent } from '@siipapx/logistica/_pages/almacen/reportes/rec-por-linea/rec-por-linea.component';
import { ConteosService } from '../../services/conteos/conteos.service';
// import { ValidacionConteoComponent } from './reportes/validacion-conteo/validacion-conteo.component';

@Component({
  selector: 'sx-cajas-page',
  templateUrl: './cajas-page.component.html',
})
export class CajasPageComponent implements OnInit {

  navigation: Object[] = [
     {route: 'cotizaciones', title: 'Cotizaciones', icon: 'storage'},
  ];

  reportes = [

  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
  }

  print() {
    console.log('Imprimir reportes 1: ');
  }

  runReport(report) {

  }

  reporteProductosSinSector() {
      /*
    this.service.productosSinSector()
    .subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/pdf'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
    */
  }

  recorridosPorLinea() {
      /*
    const dialogRef = this.dialog.open(RecPorLineaComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.recorridosPorLinea(result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          });
      }
    });
    */
  }
}
