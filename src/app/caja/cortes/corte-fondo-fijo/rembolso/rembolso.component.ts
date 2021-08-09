import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FondoFijo } from 'app/caja/models/fondoFijo';
import * as _ from 'lodash';


@Component({
  selector: 'sx-rembolso',
  templateUrl: './rembolso.component.html',
  styleUrls: ['./rembolso.component.scss']
})
export class RembolsoComponent implements OnInit {

  form: FormGroup;
  rembolso = null;
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<RembolsoComponent>,
    private fb: FormBuilder
  ) {
    this.rembolso = data.rembolso
    this.buildForm();
    
  }

    // fondo?: FondoFijo
  private buildForm() {
    this.form = this.fb.group({
      fecha: [{value: new Date(), disabled: false}, Validators.required],
      documento: [''],
      descripcion: ['REMBOLSO', Validators.required],
      importe: [-(this.rembolso.importe), [Validators.required, this.validarImporte.bind(this)]],
      rembolso: true,
      comentario: ['']
    });
  }

  ngOnInit() {
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
    if ( importe <= 0 ) {
      return {importeInvalido: true};
    }
    return null;
  }

}
