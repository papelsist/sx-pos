import { Component, OnInit, Input, Output } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent
}
from '@covalent/core';


const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'sx-dec-comdet-grid',
  templateUrl: './dec-comdet-grid.component.html'
})
export class DecComdetGridComponent implements  OnInit {

  @Input() data = [];

  @Input() selectedRows: any[] = [];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  selectable  = true;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 10;
  sortBy: string = 'producto.clave';
  
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Clave', sortable: true, width: 30, numeric: false },
    { name: 'producto.descripcion',  label: 'Descripcion', sortable: true, width: 320, numeric: false },
    { name: 'cantidad',  label: 'Ingresado', sortable: true, width: 20, numeric: true, format: NUMBER_FORMAT },
    { name: 'devuelto',  label: 'Devuelto', sortable: true, width: 20, numeric: true, format: NUMBER_FORMAT },
    { name: 'disponible',  label: 'Por devolver', sortable: true, width: 20, numeric: true, format: NUMBER_FORMAT },
  ];

  constructor(private _dataTableService: TdDataTableService) {}

  ngOnInit(): void {
    this.filter();
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
    let excludedColumns: ['cantidad']
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
}