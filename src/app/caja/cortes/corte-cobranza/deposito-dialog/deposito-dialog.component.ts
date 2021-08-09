import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { CorteCobranza } from 'app/caja/models/corteCobranza';

@Component({
  selector: 'sx-deposito-dialog',
  templateUrl: './deposito-dialog.component.html',
  styleUrls: ['./deposito-dialog.component.scss']
})
export class DepositoDialogComponent implements OnInit {

  form: FormGroup;

  corte: CorteCobranza;
  
  subscription: Subscription
  
    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<DepositoDialogComponent>,
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
        tipoDeVenta: [{value: this.corte.tipoDeVenta, disabled: true}, Validators.required],
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
        this.corte.cambiosDeCheques = this.form.get('cambiosDeCheques').value;
        this.corte.tipoDeVenta = this.form.get('tipoDeVenta').value;
        this.dialogRef.close(this.corte);
      }
    }
  
    
    get disponible() {
      return _.round( 
        (this.corte.pagosRegistrados - this.corte.cortesAcumulado ), 2);
      
    }
    
    validarImporte(control: AbstractControl) {
      const importe = control.value;
      if( importe <= 0 ){
        return {importeInvalido: true};
      }
      return null;
    }


}
