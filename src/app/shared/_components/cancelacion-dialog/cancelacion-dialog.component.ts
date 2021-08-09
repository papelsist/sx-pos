import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sx-cancelacion-dialog',
  templateUrl: './cancelacion-dialog.component.html',
  styles: ['.fill { width: 100%; }'],
})
export class CancelacionDialogComponent implements OnInit {


  form: FormGroup
  title = 'Cancelación de operación';

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<CancelacionDialogComponent>,
    private fb: FormBuilder,
  ) {
    if (data.title) {
      this.title = data.title;
    }
    this.form = fb.group({
      solicito: ['', Validators.required],
      motivo: ['', Validators.required],
      usuario: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      ... this.form.getRawValue(),
    };
    this.dialogRef.close(res);
  }

  setUsuario(usuario: any) {
    this.form.get('usuario').setValue(usuario);
  }

}

