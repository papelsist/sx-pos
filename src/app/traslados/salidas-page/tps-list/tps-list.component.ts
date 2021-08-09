import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent} from '@covalent/core';

@Component({
  selector: 'sx-tps-list',
  templateUrl: './tps-list.component.html',
  styles: []
})
export class TpsListComponent implements OnInit {

  @Input() salidas = [];

  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'TPS', sortable: true, width: 20 },
    { name: 'fecha', label: 'Fecha', filter: true, width: 100 },
    { name: 'comentario', label: 'Comentario', hidden: false, width: 300},
    { name: 'solicitudDeTraslado.sucursalSolicita.nombre', label: 'Solicita', width: 200},
    { name: 'fechaInventario', label: 'Inventariado', hidden: false, width: 220},
    { name: 'timbrado', label:'Timbrado', width:80, numeric: false},
    { name: 'print', label:'Imp', width:50, numeric: false}
  ];

  @Input() data: any[] = [];
  
  // filteredData: any[] = this.data;
  // filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = '';
  selectable = false;
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  
  @Output() print = new EventEmitter();

  constructor(
    private _dataTableService: TdDataTableService,
  ) { }

  ngOnInit() {
    this.filter();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    /*
    this.searchTerm = searchTerm;
    this.filter();
    */
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
    // newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    // this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    // newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.data = newData;
  }

}


