import { Component, OnInit } from '@angular/core';
import { TdDialogService, TdMediaService } from '@covalent/core';
import { MdDialog } from '@angular/material';

import { MovimientosService } from 'app/logistica/services/movimientos/movimientos.service';
import { DiscrepanciasComponent } from '../../reportes/discrepancias/discrepancias.component';

@Component({
  selector: 'sx-inventarios-page',
  templateUrl: './inventarios-page.component.html',
  styles: ['']
})
export class InventariosPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'movimientos', title: 'Movimientos', icon: 'swap_horiz'},
    {route: 'transformaciones', title: 'Transformaciones', icon: 'transform'},
    {route: 'devoluciones', title: 'Devolución ventas', icon: 'layers_clear'},
    {route: 'decs', title: 'Dev de compras', description: '(DECS)', icon: 'info'},
    {route: 'kardex', title: 'Kardex', descripcion: 'Kardex de productos', icon: 'layers'},
    {route: 'existencias', title: 'Existencias', icon: 'layers'},
    {route: 'facturas', title: 'Facturas', icon: 'layers'}, 
    {route: 'puestos',title: 'Puestos', icon: 'input'}
  ];
  reportes = [
    {
      name: 'discrepancias',
      title: 'Discrepancias',
      description: 'Discrepancias',
      icon: 'blur_linear',
    },
  ]

  constructor(private service: MovimientosService,
    private _dialogService: TdDialogService,
    public dialog: MdDialog) { }

  ngOnInit() {
  }

  runReport(report) {
    if (report === 'discrepancias') {
      this.reporteDeDiscrepancias();
    }
  }

  /*reporteDeDiscrepancias1() {
    this.service.reporteDeDiscrepancias()
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }
*/
  reporteDeDiscrepancias(){
    const dialogRef = this.dialog.open(DiscrepanciasComponent, {});
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        console.log(result.fecha);
        this.service.reporteDeDiscrepancias(result).subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          }
        );
      }
    });
  }

}
