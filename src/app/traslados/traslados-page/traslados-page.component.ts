import {AfterViewInit, Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {TdMediaService} from '@covalent/core';
import {Title} from '@angular/platform-browser';
import { TrasladosService } from '../services/traslados.service';
import {MdDialog} from '@angular/material';
import { TdDialogService } from '@covalent/core';
import {RelacionTpsComponent} from '../reportes/relacion-tps/relacion-tps.component'
import {RelacionTpeComponent} from '../reportes/relacion-tpe/relacion-tpe.component'
import { SolesPendientesComponent } from '../reportes/soles-pendientes/soles-pendientes.component';
import { ValesPendientesComponent } from '@siipapx/traslados/reportes/vales-pendientes/vales-pendientes.component';


@Component({
  selector: 'sx-traslados-page',
  templateUrl: './traslados-page.component.html',
  styleUrls: ['./traslados-page.component.scss']
})
export class TrasladosPageComponent implements AfterViewInit {

  reportes = [
    {
      name: 'relacionTPS',
      title: 'Relacion de TPS',
      description: 'Reporte de TPS por dia',
      icon: 'blur_linear',
      action: 'reporteRelacionTPS()'
    },
    {
      name: 'relacionTPE',
      title: 'Relacion de TPE',
      description: 'Reporte de TPE por dia',
      icon: 'blur_linear',
      action: 'reporteRelacionTPE()'
    },
    {
      name: 'valesXRecibir',
      title: 'Vales por Recibir',
      description: 'Reporte de Vales por recibir',
      icon: 'blur_linear',
      action: 'reporteValesXRecibir()'
    },
    {
      name: 'solesXAtender',
      title: 'Solicitudes Pendientes',
      description: 'Reporte de Solicitudes por recibir',
      icon: 'blur_linear',
      action: 'reporteSolesXAtender()'
    }
   
  ];

  @Input() title = 'SX-Traslados';

  @Input() drawerTitle = 'Opciones';

  @Input() navigationRoute = '/';

  @Input() logo = 'assets:siipap-rx2';

  @Input() sidenavWidth = '300px';

  navigation = [
    {route: 'solicitudes', title: 'Solicitudes', descripcion: 'Solicitude de material', icon: 'shopping_basket'},
    {route: 'atencion', title: 'Atención', descripcion: 'Solicitudes por atender', icon: 'account_circle'},
    {route: 'recepciones', title: 'TPEs', descripcion: 'Entrada de traslados', icon: 'flight_land'},
    {route: 'salidas', title: 'TPSs', descripcion: 'Salidas de traslados', icon: 'flight_takeoff'},
    // {route: 'historico', title: 'Histórico', descripcion: 'Registro de traslados de material', icon:  'insert_chart'},
  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public media: TdMediaService,
    private _titleService: Title,
    private service: TrasladosService,
    public dialog: MdDialog,
  ) { }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle( 'SX-Traslados' );
  }

  runReport(report) {
    if (report === 'relacionTPS') {
      this.reporteRelacionTPS();
    }
    if (report === 'relacionTPE') {
      this.reporteRelacionTPE();
    }
    if (report === 'valesXRecibir') {
      this.reporteValesXRecibir();
    }
    if (report === 'solesXAtender') {
      this.reporteSolesXAtender();
    }
  }

  reporteRelacionTPS() {

    const dialogRef = this.dialog.open(RelacionTpsComponent, {});

    dialogRef.afterClosed().subscribe(result=>{
      if(result){   
        console.log('Ejecutando el reporte de traslados');
        this.service.reporteRelacionTPS(result).subscribe(res =>{
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        });
      }
    });
}

reporteRelacionTPE() {

  const dialogRef = this.dialog.open(RelacionTpeComponent, {});

  dialogRef.afterClosed().subscribe(result=>{
    if(result){   
  
      this.service.reporteRelacionTPE(result).subscribe(res =>{
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
    }
  });
}

reporteValesXRecibir(){
  
   const dialogRef = this.dialog.open(ValesPendientesComponent, {});
  dialogRef.afterClosed().subscribe(result =>{
        if(result){
          console.log("Reporte de vales por recibir");
          this.service.reporteValesPorRecibir(result).subscribe(res =>{
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          });
        }
  });


}
reporteSolesXAtender(){

  const dialogRef = this.dialog.open(SolesPendientesComponent, {});
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      console.log("Reporte de soles por atender");
      this.service.reporteSolesPorAtender(result).subscribe(res =>{
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
