import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sx-cambio-de-cliente',
  templateUrl: './cambio-de-cliente.component.html',
  styles: ['.fill { width: 100%; }'],
})
export class CambioDeClienteComponent implements OnInit {


  form: FormGroup
  

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<CambioDeClienteComponent>,
    private fb: FormBuilder,
  ) {
    if (data.title) {
      
    }
    this.form = fb.group({
      cliente: [null, Validators.required],
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

