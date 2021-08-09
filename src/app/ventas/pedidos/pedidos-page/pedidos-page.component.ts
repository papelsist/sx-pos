import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MdDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import * as FileSaver from 'file-saver';

import * as fromRoot from 'app/reducers';
import { Sucursal } from 'app/models';
import { AddNewClienteService } from 'app/clientes/services/add-new-cliente/add-new-cliente.service';
import { SelectorFechaComponent } from 'app/shared/_components/selector-fecha/selector-fecha.component';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { VentasDiariasCheComponent } from '../../_components/ventas-diarias-che/ventas-diarias-che.component';


@Component({
  selector: 'sx-pedidos-page',
  templateUrl: './pedidos-page.component.html'
})
export class PedidosPageComponent implements OnInit {
  sucursal$: Observable<Sucursal>;

  navigation: Object[] = [
    { route: 'pendientes', title: 'Pendientes', icon: 'alarm' },
    {
      route: 'facturacionCredito',
      title: 'Facturación CRE',
      icon: 'event_note'
    },
    {
      route: 'facturados',
      title: 'Facturas ',
      descripcion: 'Facturas generadas',
      icon: 'view_list'
    },
    {
      route: 'canceladas',
      title: 'Canceladas',
      descripcion: 'Cancelación de facturas',
      icon: 'cancel'
    },
    {
      route: 'solicitudes',
      title: 'Solicitud de deposito',
      descripcion: 'Solicitud de autorizacion de deposito',
      icon: 'verified_user'
    },
    {
      route: 'soporte',
      title: 'Solicitud de Modificacion',
      descripcion: 'Solicitud Cambios y Soporte Técnico',
      icon: 'verified_user'
    },
    {
      route: 'complementos',
      title: 'Complementos',
      descripcion: 'Complementos de facturación',
      icon: 'info'
    },

    /*{route: 'devoluciones', title: 'Devoluciones', descripcion: 'Devolución de facturas', icon: ''},
    {route: 'traslados', title: 'Traslados', descripcion: 'Devolución de facturas', icon: ''},*/
  ];

  reportes = [
    {
      name: 'clientesNuevos',
      title: 'Clientes nuevos',
      description: 'Alta de nuevos clientes',
      icon: 'blur_linear'
    },
    {
      name: 'ventasDiariasChe',
      title: 'Ventas Che',
      description: 'Ventas con Cheque ',
      icon: 'blur_linear'
    }

  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog,
    private store: Store<fromRoot.State>,
    private addNewClienteService: AddNewClienteService,
    private service: PedidosService
  ) {}

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  addNewCliente() {
    this.addNewClienteService.newCliente();
  }

  runReport(report) {
    console.log('Ejecutando reporte: ', report);
    if (report === 'clientesNuevos') {
      this.clientesNuevos();
    }
    if (report === 'ventasDiariasChe') {
      this.ventasDiariasChe();
    }
  }

  clientesNuevos() {
    const dialogRef = this.dialog.open(SelectorFechaComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.service.clientesNuevos(result).subscribe(res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        });
      }
    });
  }


  ventasDiariasChe() {

    const dialogRef = this.dialog.open(VentasDiariasCheComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service
          .runReport('report/ventasDiariasCheques', result)
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
