import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import { Embarque } from 'app/logistica/models/embarque';
import { Envio } from 'app/logistica/models/envio';

@Component({
  selector: 'sx-partidas-envio-dialog',
  templateUrl: './partidas-envio-dialog.component.html',
  styleUrls: ['./partidas-envio-dialog.component.scss']
})
export class PartidasEnvioDialogComponent implements OnInit {
  
  form: FormGroup;
  loading = false;
  error: any;
  embarque: Embarque;
  envio: Envio;

  tipos = ['VENTA','TRASLADO','DEVOLUCION'];

  constructor(
    public dialogRef: MdDialogRef<PartidasEnvioDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: EmbarqueService
  ) {
    this.embarque = data.embarque;
  }

  ngOnInit() {
    this.form = this.fb.group({
      tipo: ['VENTA', Validators.required],
      documento: [null, Validators.required],
      fecha: [new Date(), Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    this.dialogRef.close(this.envio);
  }

  buscarDocumento() {
    const docto = this.form.value;
    //console.log("Buscando documento", this.form.value);
    if(Object.prototype.toString.call(docto.fecha) === '[object Date]'){
      // console.log('Tipo de fecha: ', typeof docto.fecha);
      // console.log('Fecha: ', date.toISOString())
      const date: Date = docto.fecha
      docto.fecha = date.toISOString();
    }
    this.buscar(docto);
  }

  buscar(docto) {
    console.log('Buscando documento: ', docto);
    if(this.form.valid) {
      this.loading = true;
      this.service.buscarDocumento(this.embarque.sucursal.id, docto.tipo, docto.documento, docto.fecha)
      .delay(1000)
      .subscribe(
        envio => this.selectEnvio(envio),
        response => this.handleError(response));
    }
  }

  selectEnvio(envio) {
    console.log('Envio sselecionado: ', envio);
    this.envio = envio;
    this.error = null;
    this.loading = false;
  }

  handleError(response) {
    console.error('Error buscando documento ', response);
    if(response.status === 404) {
      this.error = 'Documento no localizada';
    } else if (response.message !== null) {
      this.error = response.message;
    }
    this.loading = false;
  }

}
