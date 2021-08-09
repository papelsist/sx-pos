import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'sx-cheque-dialog',
  templateUrl: './pago-anticipo.component.html',
  styles: [
    `
      .cheque-form {
        min-width: 650px;
      }
    `,
  ],
})
export class PagoAnticipoComponent implements OnInit {
  form: FormGroup;
  anticipos: any;
  cliente: string;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<PagoAnticipoComponent>,
    private fb: FormBuilder
  ) {
    this.cliente = data.cliente;
    this.anticipos = data.anticipos;
    console.log('Data: ', data);
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      anticipo: [null, Validators.required],
    });
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    if (this.form.valid) {
      // this.corte.comentario = this.form.get('comentario').value;
      // this.corte.deposito = this.disponible;
      // console.log('Corte de cheque :', this.corte);
      this.dialogRef.close(this.form.value.anticipo);
    }
  }
}
