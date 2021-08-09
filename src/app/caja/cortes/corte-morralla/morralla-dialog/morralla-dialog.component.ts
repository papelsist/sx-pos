import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import {Morralla} from 'app/caja/models/morralla';


@Component({
  selector: 'sx-morralla-dialog',
  templateUrl: './morralla-dialog.component.html',
  styleUrls: ['./morralla-dialog.component.scss']
})
export class MorrallaDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<MorrallaDialogComponent>,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      fecha: [{value: new Date(), disabled: false}, Validators.required],
      tipo: ['', Validators.required],
      importe: [0.0, [Validators.required, this.validarImporte.bind(this)]],
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
      const fondoFijo: Morralla = {
        ... this.form.getRawValue(),
      }
      fondoFijo.importe = _.toNumber(importe);
      this.dialogRef.close(fondoFijo);
    }
  }


  validarImporte(control: AbstractControl) {
    const importe = control.value;
    if (importe <= 0 ) {
      return {importeInvalido: true};
    }
    return null;
  }

}
