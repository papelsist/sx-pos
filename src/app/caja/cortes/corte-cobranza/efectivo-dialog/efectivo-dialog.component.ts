import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CorteCobranza } from 'app/caja/models/corteCobranza';

import * as _ from 'lodash';

@Component({
  selector: 'sx-efectivo-dialog',
  templateUrl: './efectivo-dialog.component.html',
  styleUrls: ['./efectivo-dialog.component.scss']
})
export class EfectivoDialogComponent implements OnInit, OnDestroy{

  form: FormGroup;

  subscription: Subscription

  corte: CorteCobranza;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<EfectivoDialogComponent>,
    private fb: FormBuilder
  ) { 
    this.corte = data;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      deposito: [this.corte.deposito, [Validators.required, this.validarImporte.bind(this)]],
      cierre: false,
      anticipoCorte: false,
      comentario: ['']
    });
  }

  ngOnInit() {
    this.form.get('deposito').setValue(this.disponible);
    this.subscription = this.form.get('cierre').valueChanges.subscribe( checked => {
      if(checked) {
        this.form.get('deposito').setValue(this.disponible);
        this.form.get('deposito').disable();
      } else {
        this.form.get('deposito').enable();
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    if (this.form.valid) {
      this.corte.deposito = _.toNumber(this.form.get('deposito').value);
      this.corte.comentario = this.form.get('comentario').value;
      this.corte.cierre = this.form.get('cierre').value;
      this.corte.anticipoCorte = this.form.get('anticipoCorte').value;
      this.dialogRef.close(this.corte);
    }
  }


  get disponible() {
    return _.round( 
      (this.corte.pagosRegistrados - this.corte.cortesAcumulado + this.corte.cambiosDeCheques), 2);
    
  }

  calcularFechaDeposito() {
    const today = new Date();
    if(this.form.get('anticipoCorte').value) {
      return new Date().setDate(today.getDate() - 1);
    }
    return today;
  }

  validarImporte(control: AbstractControl) {
    const importe = control.value;
    if( importe <= 0 ){
      return {importeInvalido: true};
    }
    return null;
  }

}
