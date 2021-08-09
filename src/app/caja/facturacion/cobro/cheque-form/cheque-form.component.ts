import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

import {Cobro, CobroCheque} from 'app/models/cobro';

@Component({
  selector: 'sx-cheque-form',
  templateUrl: './cheque-form.component.html',
  styleUrls: ['./cheque-form.component.scss']
})
export class ChequeFormComponent implements OnInit {

  form: FormGroup;
  cobro: Cobro

  constructor(
    private fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<ChequeFormComponent>,
  ) {
    this.cobro = data.cobro;
  }

  ngOnInit() {
    this.form = this.fb.group({
      numero: [0, Validators.required],
      bancoOrigen: [null, Validators.required],
      numeroDeCuenta: ['', Validators.required],
    });
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    if (this.form.valid) {
      const cheque: CobroCheque = {
        ...this.form.value
      }
      this.cobro.cheque = cheque;
      this.dialogRef.close(this.cobro);
    }
  }

}

