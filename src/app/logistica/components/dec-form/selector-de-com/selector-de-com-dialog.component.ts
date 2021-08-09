import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";

import { DecsService } from "app/logistica/services/decs/decs.service";

import * as _ from 'lodash';
import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';
import { RecepcionDeCompraDet } from 'app/logistica/models/recepcionDeCompraDet';


@Component({
  selector: 'sx-selector-de-com-dialog',
  templateUrl: './selector-de-com-dialog.component.html',
  styleUrls: ['./selector-de-com-dialog.component.scss']
})
export class SelectorDeComDialogComponent implements OnInit {

  sucursal;

  proveedor;

  form: FormGroup;

  selected = [];
  
  constructor(
    public dialogRef: MdDialogRef<SelectorDeComDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: DecsService
  ) { 
    this.sucursal = data.sucursal;
    this.proveedor = data.proveedor;
  }

  ngOnInit() {
    this.form = this.fb.group({
      sucursal: [{ value: this.sucursal.id, disabled: true}, Validators.required],
      producto: [null, Validators.required],
      cantidad: [null, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const provProducto = this.form.get('producto').value;
    const producto = provProducto.producto;
    const res = {
      cantidad: this.form.get('cantidad').value,
      producto: {
        id: producto.id,
        clave: producto.clave,
        descripcion: producto.descripcion
      }
    }
    this.dialogRef.close(res);
  }
  
  /*
  Util para descriminar colecciones

  get disponibles() {
    if(this.com === null) return [];

    //let partidas = this.com.partidas;
    const partidas = _.filter(this.com.partidas, item => item.disponible > 0 )

    const filtrados = _.differenceWith(partidas, this.selected, (val1, val2) => {
      return val1.id === val2.id;
    });
    // console.log('Filtrando con excludes', filtrados);
    return filtrados
  }
  */

}
