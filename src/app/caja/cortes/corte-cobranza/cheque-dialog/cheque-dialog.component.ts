import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { CorteCobranza } from 'app/caja/models/corteCobranza';


@Component({
  selector: 'sx-cheque-dialog',
  templateUrl: './cheque-dialog.component.html',
  styleUrls: ['./cheque-dialog.component.scss']
})
export class ChequeDialogComponent implements OnInit {

  form: FormGroup;

  corte: CorteCobranza;

  cheques: any
  
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<ChequeDialogComponent>,
    private fb: FormBuilder
  ) { 
    this.corte = data[0];
    this.cheques = data[1];
    this.buildForm();
  }
  
  private buildForm() {
    this.form = this.fb.group({
      tipoDeVenta: [{value: this.corte.tipoDeVenta, disabled: true}, Validators.required],
      comentario: ['']
    });
  }
  
  ngOnInit() {}
  
  ngOnDestroy(){}
  
  cancelar() {
    this.dialogRef.close(null);
  }
  
  onSubmit() {
    
    if (this.form.valid) {
      this.corte.comentario = this.form.get('comentario').value;
      this.corte.deposito = this.disponible
      console.log('Corte de cheque :', this.corte)
      this.dialogRef.close(this.corte);
      
    }
    
  }
  
  get disponible() {
    return _.round( 
      (this.corte.pagosRegistrados - this.corte.cortesAcumulado + this.corte.cambiosDeCheques), 2);
    
  }

}
