import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import {
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  ITdDataTableColumn,
} from '@covalent/core';
import { IPageChangeEvent, TdDialogService } from '@covalent/core';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';
import { PagoAnticipoComponent } from '../pago-anticipo/pago-anticipo.component';

@Component({
  selector: 'sx-pendientes-page',
  templateUrl: './pendientes-page.component.html',
})
export class PendientesPageComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'documento', label: 'Folio', numeric: true, width: 20 },
    { name: 'fecha', label: 'Fecha', width: 50 },
    { name: 'nombre', label: 'Cliente', width: 300 },
    { name: 'formaDePago', label: 'F.Pago', width: 90 },
    { name: 'total', label: 'Total', width: 20 },
    { name: 'updateUser', label: 'Vendedor', width: 20 },
    { name: 'facturarUsuario', label: 'Solicitó', width: 20 },
    { name: 'facturar', label: 'Solicitado', width: 100 },
    { name: 'anticipo', label: 'Anticipo', width: 20 },
    { name: 'regresar', label: 'Regresar', width: 20 },
  ];

  data: any[] = [];

  constructor(
    private _dataTableService: TdDataTableService,
    private service: CajaService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.pendientesDeFacturar('CON').subscribe(
      (pendientes) => {
        this.data = pendientes;
      },
      (error) => console.log('Error: ', error)
    );
  }

  search(searchTerm: string): void {}

  regresarAVentas(pedido: Venta) {
    pedido.facturar = null;
    this._dialogService
      .openConfirm({
        message: `Regresar a pendientes el pedido ${pedido.tipo} - ${pedido.documento} (${pedido.total})`,
        viewContainerRef: this._viewContainerRef,
        title: 'Ventas de crédito',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          this.doRegresar(pedido);
        }
      });
  }

  doRegresar(pedido) {
    this.service.regresarAPedidos(pedido).subscribe(
      (res) => {
        this.load();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getFormaDePago(row: Venta) {
    switch (row.formaDePago) {
      case 'TARJETA_DEBITO':
        return 'TAR_DEV';
      case 'TARJETA_CREDITO':
        return 'TAR_CRE';
      case 'TRANSFERENCIA':
        return 'TRANS';
      case 'DEPOSITO_EFECTIVO':
        return 'DEP_EFE';
      case 'DEPOSITO_CHEQUE':
        return 'DEP_CHE';
      default:
        return row.formaDePago;
    }
  }

  pagarConAnticipo(row: Venta) {
    console.log('Pagar con anticipo...');
    this.service.buscarAnticiposDisponibles(row.cliente.id).subscribe(
      (res: any[]) => {
        if (res && res.length > 0) {
          this.doPagarConAnticipo(row, res);
        } else {
          this._dialogService.openAlert({
            title: 'Anticipos disponibles',
            message: 'No tiene anticipos por aplicar',
            closeButton: 'Cerrar',
          });
        }
      },
      (err) => console.log('Error:', err)
    );
  }

  private doPagarConAnticipo(row: Venta, anticipos: any[]) {
    console.log('Venta:', row);
    console.log('Anticipos: ', anticipos);
    const dialogRef = this.dialog.open(PagoAnticipoComponent, {
      data: { cliente: row.nombre, anticipos },
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('Registrar cobro con anticipo:', res);
        console.log('Venta: ', row);

        this.service.registrarCobroConAnticipo(row.id, res).subscribe(
          (cobro) => {
            if (cobro) {
              console.log('Cobro: ', cobro);
              // this.router.navigate(['caja', 'cobro', row.id]);
              this.router.navigate(['caja/generadas/show', row.id]);
            }
          },
          (err) => console.error('Error:', err)
        );
      }
    });
  }
}
