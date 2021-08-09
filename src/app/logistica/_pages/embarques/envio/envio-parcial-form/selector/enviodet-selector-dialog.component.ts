import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


import * as _ from 'lodash';

import { VentaDet } from 'app/models/ventaDet';
import {Envio} from 'app/logistica/models/envio';
import {ITdDataTableColumn} from '@covalent/core';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);


@Component({
  selector: 'sx-enviodet-selector-dialog',
  templateUrl: './enviodet-selector-dialog.component.html',
  styleUrls: ['./enviodet-selector-dialog.component.scss']
})
export class EnviodetSelectorDialogComponent implements OnInit {

  form: FormGroup;

  partidasDeVenta: VentaDet[] = [];

  disponibles = [];

  envio: Envio;


  selectedRows = [];

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Clave', sortable: true, width: 30, numeric: false },
    { name: 'producto.descripcion',  label: 'Descripcion', sortable: true, width: 320, numeric: false },
    { name: 'cantidad',  label: 'Vendido', sortable: true, width: 30, numeric: true, format: NUMBER_FORMAT },
    { name: 'enviado',  label: 'Enviado', sortable: true, width: 30, numeric: true, format: NUMBER_FORMAT },
  ];

  constructor(
    public dialogRef: MdDialogRef<EnviodetSelectorDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.partidasDeVenta = data.partidasDeVenta;
    this.envio = data.envio;
    this.disponibles = _.differenceWith(this.partidasDeVenta, this.envio.partidas, ( val1, val2) => {
      return val1.id === val2.ventaDet.id;
    });
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      partidas: this.selectedRows.map( item => {
        const porEnviar = Math.abs(item.cantidad) - item.enviado
        return {
         producto: item.producto,
          ventaDet: item,
          cantidad: porEnviar
        };
      })
    }
    this.dialogRef.close(res);
  }

  /*
  get disponibles(){
    // console.log('Comprando partidas de la venta: ', this.partidasDeVenta.length);
    // console.log('Partidas del envio: ', this.envio.partidas.length);
    const res = _.differenceWith(this.partidasDeVenta, this.envio.partidas, ( val1, val2) => {
      console.log('Compranado: ', val1.id);
      console.log('Con :', val2.ventaDet.id);
      return val1.id === val2.ventaDet.id;
    });
    console.log('Res:', res );
    // const res = _.differenceWith(this.partidasDeVenta, this.envio.partidas , (val1, val2 ) => val1.id === val2.ventaDet.id)
    return res;
  }
  */


}
