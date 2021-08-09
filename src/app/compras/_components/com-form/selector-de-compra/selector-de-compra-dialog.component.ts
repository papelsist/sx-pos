import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";



import * as _ from 'lodash';
import { Compra } from "app/models";
import { CompraDet } from 'app/models/compraDet';
import { ComsService } from 'app/compras/services/coms.service';

@Component({
  selector: 'sx-selector-de-compra-dialog',
  templateUrl: './selector-de-compra-dialog.component.html',
  styleUrls: ['./selector-de-compra-dialog.component.scss']
})
export class SelectorDeCompraDialogComponent implements OnInit {

  sucursal;
  form: FormGroup;
  loading = false;
  error: any;
  compra: Compra;

  selected: CompraDet[] = [];

  
  selectedRows: any[] = [];

  constructor(
    public dialogRef: MdDialogRef<SelectorDeCompraDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: ComsService
  ) { 
    this.sucursal = data.sucursal;
    this.compra = data.compra;
    this.selected = data.selected;
  }

  ngOnInit() {
    this.form = this.fb.group({
      folio: [null, Validators.required],
      sucursal: [{ value: this.sucursal.id, disabled: true}, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      compra: this.compra,
      partidas: this.selectedRows
    }
    this.dialogRef.close(res);
  }

  buscarCompra() {
    if(this.form.valid) {
      this.loading = true;
      const filtro = Object.assign({}, this.form.getRawValue());
      this.service.buscarCompra(filtro)
      //.delay(2000)
      .subscribe(
        compra => this.selectCompra(compra),
        response => this.handleError(response));
    }
  }

  selectCompra(compra) {
    this.compra = compra;
    console.log('Partidas de compra seleccionada: ', compra.partidas);
    this.error = null;
    this.loading = false;
  }

  handleError(response) {
    console.error('Error buscando compra ', response);
    if(response.status === 404) {
      this.error = 'Compra no localizada';
    } else if (response.message !== null) {
      this.error = response.message;
    }
    this.loading = false;
  }

  get disponibles() {
    if(this.compra === null) return [];
    // const partidas = this.compra.partidas;
    // return _.filter(partidas, item => item.pendiente > 0 )
    const partidas = _.filter(this.compra.partidas, item => item.pendiente > 0 )

    const filtrados = _.differenceWith(partidas, this.selected, (val1, val2) => {
      return val1.id === val2.id;
    });
    return filtrados;
  }
  

}
