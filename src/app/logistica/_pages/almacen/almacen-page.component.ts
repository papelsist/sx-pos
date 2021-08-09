import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import {MdDialog} from '@angular/material';
import { SectoresService } from '@siipapx/logistica/services/sectores/sectores.service';
import { RecPorLineaComponent } from '@siipapx/logistica/_pages/almacen/reportes/rec-por-linea/rec-por-linea.component';
import { ConteosService } from '../../services/conteos/conteos.service';
import { ValidacionConteoComponent } from './reportes/validacion-conteo/validacion-conteo.component';

@Component({
  selector: 'sx-almacen-page',
  templateUrl: './almacen-page.component.html',
})
export class AlmacenPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'sectores', title: 'Sectores', icon: 'storage'},
    {route: 'conteo', title: 'Conteo de inventario', icon: 'subtitles'},
    {route: 'captura', title: 'Captura de conteo', icon: 'swap_horiz'},
  ];

  reportes = [
    {
      name: 'noCapturados',
      title: 'No Capturados',
      description: 'Productos con existencia no capturados en algun sector',
      icon: 'blur_linear',
      action: 'reporteNoCapturados()'
    },
    {
      name: 'diferenciasConteo',
      title: 'Diferencias',
      description: '',
      icon: 'blur_linear',
      action: 'reporteDeDiferencias()'
    },
    {
      name: 'validacionDeConteo',
      title: 'Validación',
      description: '',
      icon: 'blur_linear',
      action: 'reporteDeValidacion()'
    },
  /*
    {
      name: 'medidasEspeciales',
      title: 'Medidas E',
      description: '',
      icon: 'blur_linear',
      action: 'reporteDeValidacion()'
    }, */
    {
      name: 'productosSinSector',
      title: 'Prods sin sector',
      description: '',
      icon: 'blur_linear',
      action: 'reporteProductosSinSector()'
    },
    {
      name: 'recorridosPorLinea',
      title: 'Recorridos x línea',
      icon: 'blur_linear',
      action: 'recorridosPorLinea()'
    }
  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: SectoresService,
    private conteosService: ConteosService,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
  }

  print() {
    console.log('Imprimir reportes 1: ');
  }

  runReport(report) {
    if (report === 'productosSinSector') {
      this.reporteProductosSinSector();
    }
    if (report === 'recorridosPorLinea') {
      this.recorridosPorLinea();
    }
    if (report === 'noCapturados') {
      this.reporteNoCapturados();
    }
    if (report === 'validacionDeConteo') {
      this.reporteValidacion()
    }
    if (report === 'diferenciasConteo') {
        this.reporteDeDiferencias()
    }
  }

  reporteProductosSinSector() {
    this.service.productosSinSector()
    .subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/pdf'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }

  recorridosPorLinea() {
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
  }


  reporteValidacion() {
    const dialogRef = this.dialog.open(ValidacionConteoComponent, {data:{titulo: 'Validacion De Conteo'}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.conteosService.reporteValidacion(result)
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

  reporteDeDiferencias() {
    const dialogRef = this.dialog.open(ValidacionConteoComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.conteosService.reporteDiferencia(result)
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

  reporteNoCapturados() {
    console.log('Reporte de no capturados');
    this.conteosService.reporteNoCapturados()
    .subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/pdf'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }
}
