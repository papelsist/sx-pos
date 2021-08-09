import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { ITdDataTableColumn } from '@covalent/core';

import { Cobro, CobroTarjeta } from 'app/models/cobro';
import { Cliente } from 'app/models';

import { CobroService } from 'app/caja/services/cobro.service';
import * as moment from 'moment';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'sx-disponible-form',
  templateUrl: './disponible-form.component.html',
  styleUrls: ['./disponible-form.component.scss']
})
export class DisponibleFormComponent implements OnInit {
  cliente: Cliente;

  disponibles: Cobro[] = []; // see json data

  filteredData: any[] = this.disponibles;
  filteredTotal: number = this.disponibles.length;

  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 50;
  selectedRows: any[] = [];

  columns: ITdDataTableColumn[] = [
    {
      name: 'fecha',
      label: 'Fecha',
      sortable: true,
      width: 15,
      format: value => moment(value).format('DD/MM/YYYY')
    },
    { name: 'tipo', label: 'Tipo', filter: true },
    { name: 'referencia', label: 'Ref', hidden: false, width: 90 },
    { name: 'folio', label: 'Folio', hidden: false, width: 50 },
    { name: 'formaDePago', label: 'F.Pago', filter: true, width: 150 },
    { name: 'importe', label: 'Importe', numeric: true, width: 120 },
    {
      name: 'aplicado',
      label: 'Aplicado',
      numeric: true,
      format: DECIMAL_FORMAT
    },
    {
      name: 'disponible',
      label: 'Disponible',
      numeric: true,
      format: DECIMAL_FORMAT
    }
  ];

  loading = false;
  porCobrar;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<DisponibleFormComponent>,
    private service: CobroService
  ) {
    this.cliente = data.cliente;
    this.porCobrar = data.porCobrar;
    console.log('DATA: ', data);
  }

  ngOnInit() {
    this.loading = true;
    this.service.buscarDisponibles(this.cliente).subscribe(
      disponibles => {
        this.setDisponibles(disponibles);
        this.loading = false;
      },
      error2 => {
        this.loading = false;
        console.error(error2);
      }
    );
  }

  private setDisponibles(res: Cobro[]) {
    console.log('Disponibles: ', res);
    this.disponibles = res;
    this.filteredData = this.disponibles;
    this.filteredTotal = this.filteredData.length;
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  aceptar() {
    if (this.selectedRows.length > 0) {
      this.dialogRef.close(this.selectedRows[0]);
    }
  }
}
