import { Component, OnInit, Input, Output } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent
}
from '@covalent/core';


const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'sx-com-compradet-grid',
  templateUrl: './comCompradet-grid.component.html'
})
export class ComCompradetGridComponent implements OnInit {

  @Input() data = [];

  @Input() selectedRows: any[] = [];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  selectable  = true;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 10;
  sortBy: string = 'clave';
  
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  columns: ITdDataTableColumn[] = [
    { name: 'clave',  label: 'Clave', sortable: true, width: 40, numeric: false, nested: false },
    { name: 'descripcion',  label: 'Descripcion', sortable: true, width: 300, numeric: false },
    { name: 'solicitado',  label: 'Solicitado', sortable: true, width: 40, numeric: true, format: NUMBER_FORMAT },
    { name: 'recibido',  label: 'Recibido', sortable: true, width: 40, numeric: true, format: NUMBER_FORMAT },
    { name: 'pendiente',  label: 'Por recibir', sortable: false, width: 40, numeric: true, format: NUMBER_FORMAT },
    
    
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
    console.log('Filtrando: ', searchTerm);
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
    let excludedColumns = [];
    console.log('Data: ', this.searchTerm);
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    console.log('Filtered data: ', newData);
    this.filteredData = newData;
  }
}