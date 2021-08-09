import {Component, OnInit, ViewContainerRef, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction, RegistrarSalidaAction } from 'app/logistica/store/actions/embarques.actions';
import { Embarque } from 'app/logistica/models/embarque';
import {TdDialogService} from '@covalent/core';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import * as FileSaver from 'file-saver'; 

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'sx-traslados-pendientes-page',
  templateUrl: './traslados-pendientes.component.html',
})
export class TrasladosPendientesPageComponent implements OnInit {

  embarques$: Observable<Embarque[]>;
 
  loading$: Observable<boolean>;

  columns: ITdDataTableColumn[] = [
    { name: 'documento', label: 'Documento', hidden: false, width: 10},
    { name: 'createUser', label: 'Solicita', hidden: false , width: 350},
    { name: 'solicitudDeTraslado.sucursalSolicita.nombre', label: 'Sucursal solicita', hidden: false, width:100 },
    { name: 'kilos', label: 'Kilos', hidden: false, width: 15 },
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
  selectable = false;
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: EmbarqueService,
    private router: Router,
    private _dataTableService: TdDataTableService
  ) { }

  ngOnInit() {
    
    this.service.buscarTrasladosPendientes()
    .subscribe( data => {
       this.data = data;
       this.filteredData= this.data;
       this.filter();
     });
    this.load();

  }

  load() {
    
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
  }

  

  getRetraso(value: any) {
    const salida = new Date(value).getTime();
    const hoy = new Date().getTime();
    const diff = (hoy - salida)/ (3600 * 1000);
    const entera = Math.round(diff);
    let decimales = (diff - entera) * 60;
    decimales = Math.round(decimales);
    
    
    return `${entera}:${decimales}`;
   
  }
}
