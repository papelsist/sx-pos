import { Component, OnInit } from '@angular/core';
import {VentasDiariasCheComponent} from 'app/caja/reportes/ventas-diarias-che/ventas-diarias-che.component';
import {TdDialogService} from '@covalent/core';
import {MdDialog} from '@angular/material';
import {CobroService} from 'app/caja/services/cobro.service';
import {ArqueoComponent} from 'app/caja/reportes/arqueo/arqueo.component';
import { RelacionFichasComponent } from 'app/caja/reportes/relacion-fichas/relacion-fichas.component';

@Component({
  selector: 'sx-cortes-page',
  templateUrl: './cortes-page.component.html'
})
export class CortesPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'cobranza', title: 'Corte cobranza', icon: 'storage'},
    {route: 'fondoFijo', title: 'Fondo fijo', icon: 'storage'},
    {route: 'morralla', title: 'Morralla', icon: 'storage'},
    {route: 'fichas', title: 'Fichas', icon: 'storage'},
  ];

  reportes = [
    {
      name: 'reporteDeAarqueoCaja',
      title: 'Arqueo',
      description: 'Reporte de arqueo de caja',
      icon: 'blur_linear',
    },
    {
      name: 'relacionDeFichasCaja',
      title: 'Fichas',
      description: 'Reporte de relación de fichas',
      icon: 'blur_linear',
    },
  ];

  constructor(
    public dialog: MdDialog,
    private _dialogService: TdDialogService,
    private service: CobroService,
  ) { }

  ngOnInit() {
  }

  runReport(report) {
    console.log('Ejecutando reporte: ', report);
    if (report === 'reporteDeAarqueoCaja') {
      this.reporteDeArqueo()
    }
    if (report === 'relacionDeFichasCaja') {
      this.relacionDeFichas()
    }
  }

  reporteDeArqueo() {
    const dialogRef = this.dialog.open(ArqueoComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.reporteDeArque(result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          });
      }
    });
  }

  relacionDeFichas() {
    const dialogRef = this.dialog.open(RelacionFichasComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.relacionDeFichasCaja(result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          });
      }
    });
  }

}
