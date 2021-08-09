import { Component, OnInit, Input } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'sx-fac-view-partidas',
  templateUrl: './fac-view-partidas.component.html',
  styleUrls: ['./fac-view-partidas.component.scss']
})
export class FacViewPartidasComponent implements OnInit {

  @Input() partidas = [];

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Clave', sortable: true, width: 15 },
    { name: 'producto.descripcion',  label: 'Descripcion', sortable: true, width: 350 },
    { name: 'cantidad', label: 'Cantidad', numeric: true, format: DECIMAL_FORMAT},
    { name: 'precio', label: 'Precio', numeric: true, format: DECIMAL_FORMAT },
    { name: 'importe', label: 'Importe', numeric: true, format: DECIMAL_FORMAT },
    { name: 'descuentoImporte', label: 'Descuento', numeric: true, format: DECIMAL_FORMAT },
    { name: 'subtotal', label: 'SubTotal', numeric: true, format: DECIMAL_FORMAT },
  ];

  filteredData: any[] = this.partidas;
  filteredTotal: number = this.partidas.length;

  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 10;
  sortBy = '';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

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
    let newData: any[] = this.partidas;
    const excludedColumns: string[] = this.columns
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

}
