import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import * as FileSaver from 'file-saver';

import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import { EntregaPorChoferComponent } from './reportes/entrega-por-chofer/entrega-por-chofer.component';
import {MdDialog} from '@angular/material';
import { FacturaEnvioComponent } from './reportes/factura-envio/factura-envio.component';



@Component({
  selector: 'sx-embarques-page',
  templateUrl: './embarques-page.component.html',
})
export class EmbarquesPageComponent implements OnInit {


  navigation: Object[] = [
    {route: 'embarques', title: 'Asignaciones', icon: 'storage'},
    {route: 'transito', title: 'Transito', icon: 'local_shipping'},
    {route: 'regresos', title: 'Regresos', icon: 'keyboard_return'},
    {route: 'facturasEnTransito', title: 'Facs en transito', icon: 'trafficx'},
    {route: 'facturasPendientes', title: 'Facs pendientes', icon: 'alarm'},
    {route: 'trasladosPendientes', title: 'Traslados', icon: 'settings_ethernet'},
    {route: 'devolucionesPendientes', title: 'Devoluciones', icon: 'sync_disabled'},

    // {route: 'choferes', title: 'Choferes', icon: 'subtitles'},
    // {route: 'transportes', title: 'Transportes', icon: 'swap_horiz'},
  ];

  reportes = [
    {
      name: 'entregasPorChofer',
      title: 'Entregas por Chofer',
      description: 'Bitacora de entregas por chofer',
      icon: 'blur_linear',
      action: 'reporteDeEntregasPorChofer()'
    },
    {
      name: 'facturaDeEnvio',
      title: 'Factura Para Envio',
      description: 'Rastreo de factura de envio',
      icon: 'blur_linear',
      action: 'reporteFacturaEnvio()'
    }
  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: EmbarqueService,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
  }


  runReport(report) {
    // this._dialogService.openAlert({
    //   message: `Reporte ${report} en desarrollo`,
    //   viewContainerRef: this._viewContainerRef,
    //   title: 'Impresíon de reporte: ' + report,
    //   closeButton: 'Cancelar',
    // });
    if (report === 'entregasPorChofer') {
      this.reporteDeEntregasPorChofer();
    }
    if (report === 'facturaDeEnvio') {
      this.reporteFacturaEnvio();
    }
  }

  reporteDeEntregasPorChofer() {

    const dialogRef = this.dialog.open(EntregaPorChoferComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.reporteDeEntregasPorChofer(result)
          .subscribe(res => {
            /*
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `EntregasPorChofer.pdf`;
            FileSaver.saveAs(blob, filename);
            */
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          });
      }
    });
  }

  reporteFacturaEnvio(){
 
     const dialogRef = this.dialog.open(FacturaEnvioComponent, {});

     dialogRef.afterClosed().subscribe(result =>{
      if (result) {
        this.service.reporteFacturaEnvio(result).subscribe(res =>{
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
