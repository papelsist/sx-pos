import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FondoFijo } from '@siipapx/caja/models/fondoFijo';
import * as _ from 'lodash';


@Component({
  selector: 'sx-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss']
})
export class GastoComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<GastoComponent>,
    private fb: FormBuilder
  ) { 
    this.buildForm();
  }

    // fondo?: FondoFijo
  private buildForm() {
    this.form = this.fb.group({
      fecha: [{value: new Date(), disabled: false}, Validators.required],
      documento: ['', Validators.required],
      descripcion: ['', Validators.required],
      importe: [0.0, [Validators.required, this.validarImporte.bind(this)]],
      rembolso: false,
      solicitud: [''],
      comentario: ['']
    });
  }
  
  ngOnInit() {
  }
  ngOnDestroy(){
  }

  get fecha() {
    return this.form.get('fecha').value;
  }
  
  cancelar() {
    this.dialogRef.close(null);
  }
  
  onSubmit() {
    if (this.form.valid) {
      const fecha: Date = this.form.get('fecha').value;
      const importe = this.form.get('importe').value;
      const fondoFijo: FondoFijo = {
        ... this.form.getRawValue(),
      }
      fondoFijo.importe = _.toNumber(importe);
      this.dialogRef.close(fondoFijo);
    }
  }
   
    
  validarImporte(control: AbstractControl) {
    const importe = control.value;
    if( importe <= 0 ){
      return {importeInvalido: true};
    }
    return null;
  }

}
