import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent, TdDialogService } from '@covalent/core';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-pendientes-page',
  templateUrl: './pendientes-page.component.html',
})
export class PendientesPageComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'Documento', numeric: true, width: 15 },
    { name: 'fecha',  label: 'Fecha', width: 10},
    { name: 'nombre',  label: 'Cliente', width: 500},
    { name: 'total',  label: 'Total', width: 10},
    { name: 'formaDePago',  label: 'F.Pago', numeric: false, width: 10},
    { name: 'cuentaPorCobrar',  label: 'Factura', width: 10},
    { name: 'regresar',  label: 'Regresar', width: 10},
  ];

  data: any[] = [];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  selectedRows: any[] = [];
  sortBy: string = 'documento';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    private _dataTableService: TdDataTableService,
    private service: CajaService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.pendientesDeFacturar('CON')
    .subscribe( pendientes => {
      this.data = pendientes;
      this.filteredData = this.data;
      }, error => console.log('Error: ', error)
    );
  }

  search(searchTerm: string): void {}


  regresarAVentas(pedido: Venta) {
    pedido.facturar = null
    this._dialogService.openConfirm({
      message: `Regresar a pendientes el pedido ${pedido.tipo} - ${pedido.documento} (${pedido.total})` ,
      viewContainerRef: this._viewContainerRef,
      title: 'Ventas de crédito',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doRegresar(pedido);
      }
    });
  }

  doRegresar(pedido) {
    this.service
      .regresarAPedidos(pedido)
      .subscribe( res => {
        this.load();
      }, error => {
        console.error(error);
      });
  }

}
