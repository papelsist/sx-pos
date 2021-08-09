import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  TdDataTableService,
  IPageChangeEvent,
  ITdDataTableSortChangeEvent
} from '@covalent/core';

@Component({
  selector: 'sx-alcances-table',
  templateUrl: './alcances-table.component.html'
})
export class AlcancesTableComponent implements OnInit, OnChanges {
  @Input() rows: any[] = [];

  columns: ITdDataTableColumn[] = [
    { name: 'clave', label: 'Clave', width: 20 },
    { name: 'descripcion', label: 'Descripción', width: 260 },
    { name: 'existencia', label: 'Inventario' },
    { name: 'promVta', label: 'Prom Vta' },
    { name: 'alcance', label: 'Alcance' },
    { name: 'comprasPendientes', label: 'Com Pdte' },
    { name: 'alcanceMasPedido', label: 'Alc Inv+P' },
    { name: 'porPedir', label: 'Por Pedir' },
    { name: 'nombre', label: 'Proveedor', width: 250 },
    { name: 'linea', label: 'Línea' },
    { name: 'marca', label: 'Marca' },
    { name: 'clase', label: 'Clase' }
  ];

  filteredData: any[] = this.rows;
  filteredTotal: number = this.rows.length;

  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 10;
  sortBy = '';
  @Input() selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rows) {
      /*
      if (this.rows.length > 0) {
        this.filteredData = this.rows;
        this.filteredTotal = this.rows.length;
        this.filter();
      }
      */
    }
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
    let newData: any[] = this.rows;
    const excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return (
          (column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false)
        );
      })
      .map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(
      newData,
      this.searchTerm,
      true,
      excludedColumns
    );
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(
      newData,
      this.sortBy,
      this.sortOrder
    );
    newData = this._dataTableService.pageData(
      newData,
      this.fromRow,
      this.currentPage * this.pageSize
    );
    this.filteredData = newData;
  }
}
