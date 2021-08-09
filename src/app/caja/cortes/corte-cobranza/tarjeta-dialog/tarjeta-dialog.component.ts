import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CorteCobranza } from 'app/caja/models/corteCobranza';
import * as _ from 'lodash';

@Component({
  selector: 'sx-tarjeta-dialog',
  templateUrl: './tarjeta-dialog.component.html',
  styleUrls: ['./tarjeta-dialog.component.scss']
})
export class TarjetaDialogComponent implements OnInit {

  form: FormGroup;
  
  subscription: Subscription

  corte: CorteCobranza;
  
    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<TarjetaDialogComponent>,
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
        tipoDeVenta: [{value:'CON', disabled: true}, Validators.required],
        cambiosDeCheques: [{valude: 0, disabled: true}, Validators.required],
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
        this.corte.deposito = this.form.get('deposito').value;
        this.corte.comentario = this.form.get('comentario').value;
        this.corte.cierre = this.form.get('cierre').value;
        this.corte.anticipoCorte = this.form.get('anticipoCorte').value;
        this.corte.cambiosDeCheques = this.form.get('cambiosDeCheques').value;
        this.corte.tipoDeVenta = this.form.get('tipoDeVenta').value;
        this.dialogRef.close(this.corte);
      }
    }
  
   
  
  get cambiosDeCheques() {
    return this.form.get('cambiosDeCheques').value;
  }
  
  get disponible() {
    return _.round( 
      (this.corte.pagosRegistrados - this.corte.cortesAcumulado), 2);
    
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
