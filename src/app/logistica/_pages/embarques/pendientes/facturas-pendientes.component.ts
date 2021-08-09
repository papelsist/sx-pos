import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { TdLoadingService, IPageChangeEvent, TdDialogService } from '@covalent/core';
import { MdDialog } from '@angular/material';
import * as _ from 'lodash';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction, RegistrarSalidaAction } from 'app/logistica/store/actions/embarques.actions';
import { Embarque } from 'app/logistica/models/embarque';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import { SelectorDeEmbarqueComponent } from './selector-de-embarque/selector-de-embarque.component';
import { Venta } from 'app/models';
import { Envio } from 'app/logistica/models/envio';


@Component({
  selector: 'sx-facturas-pendientes-page',
  templateUrl: './facturas-pendientes.component.html',
})
export class FacturasPendientesPageComponent implements OnInit, OnDestroy {

  embarquesPendientes: Embarque[];

  subscription1: Subscription
  subscription2: Subscription

  kilos = 0

  columns: ITdDataTableColumn[] = [
    { name: 'venta.tipo',  label: 'Tipo', sortable: true, width: 5 },
    { name: 'venta.nombre', label: 'Cliente', filter: true, width: 350 },
    { name: 'documento', label: 'Factura', hidden: false, width: 10},
    { name: 'venta.documento', label: 'Pedido', hidden: false, width: 10},
    { name: 'venta.fecha', label: 'Fecha', hidden: false, width: 10},
    { name: 'zona', label: 'Zona', hidden: false, width: 15},
    { name: 'municipio', label: 'Mpo', hidden: false, width: 15},
    { name: 'grupo', label: 'Gpo', hidden: false, width: 15},
    { name: 'venta.kilos', label: 'Kilos', hidden: false, width: 15 },
    { name: 'parcial', label: 'Parcial', hidden: false },
    { name: 'venta.lastUpdated', label: 'Creada', hidden: false },
    { name: 'retraso', label: 'Retraso', hidden: false },
  ];

  data: any[] = [];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = '';
  selectable = true;
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;


  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: EmbarqueService,
    private router: Router,
    private _dataTableService: TdDataTableService,
    public dialog: MdDialog,
    private _loadingService: TdLoadingService
  ) { }

  ngOnInit() {
    this.store.dispatch(new SearchAction());

    this.subscription1 = this.store
    .select(fromRoot.getEmbarquesPorSalir)
    .subscribe(embarques => {
      this.embarquesPendientes = embarques;
    });

    this.subscription2 = this.service.enviosPendientes().subscribe( data => {
      this.data = data;
      this.filteredData = this.data;
      this.filter();
    });

    
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    let excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
    this.kilos = _.reduce(this.filteredData, (sum, n) => sum + n.venta.kilos, 0);
    this.kilos = _.round(this.kilos, 3)
    // this.kilos = _.reduce(this.filteredData, (sum, n) => {
    //   console.log('Acumulando valor: ', sum);
    //   console.log('Dato: ', n);
    //   return sum + n.kilos
    // }, );
  }

  getRetraso(value: any) {
    const salida = new Date(value).getTime();
    const hoy = new Date().getTime();
    const diff = (hoy - salida)/ (3600 * 1000);
    const entera = Math.round(diff);
    let decimales = (diff - entera) * 60;
    decimales = Math.round(decimales);


    return `${entera}`;

  }

  asignarEmbarque() {
    if(this.selectedRows.length > 0 ) {
      const dialogRef = this.dialog.open(SelectorDeEmbarqueComponent, {
        data: {facturas: this.selectedRows, embarques: this.embarquesPendientes}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          
          this.subscription2 = this.service.get(result.id)
            .subscribe( embarque => {
              // this.asignarFacturas(embarque, this.selectedRows);
              this.save(embarque, this.selectedRows);
            });
        }
      });
    }
  }

  private asignarFacturas(embarque: Embarque, instruccionesDeEnvio) {
    /*
    if(embarque.partidas === undefined) {
      embarque.partidas = new Array<Envio>();
    }    
    _.forEach(instruccionesDeEnvio, (ins: any) => {
      const venta = ins.venta;
      const envio: Envio = {
        cliente: venta.cliente,
        tipoDocumento: venta.tipo,
        origen: venta.id,
        entidad: 'VENTA',
        documento: venta.documento,
        fechaDocumento: venta.fecha,
        totalDocumento: venta.total,
        formaPago: venta.formaDePago,
        nombre: ins.nombre,
        kilos: venta.kilos,
        parcial: ins.parcial
      };
      //embarque.partidas.push(envio);
    });
    this.save(embarque);
    */
  }

  private save(embarque: Embarque, instruccionesDeEnvi){
    this._loadingService.register('overlayStarSyntax');
    this.service.asignarFacturas(embarque, instruccionesDeEnvi)
    .delay(2000)
    .subscribe(
      (res:any) => {
        this._loadingService.resolve('overlayStarSyntax');
        console.log('RES: ', res);
        this.router.navigate(['/logistica/embarques/embarques/edit', res.id])
      },
      error=> {
        console.error(error)
        this._loadingService.resolve('overlayStarSyntax');
      }
    );
  }

}
