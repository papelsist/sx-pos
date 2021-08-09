import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'sx-ventas-diarias',
  templateUrl: './ventas-diarias.component.html'
})
export class VentasDiariasComponent implements OnInit {
  
  form: FormGroup;

  tipos = ['CON','COD','CRE'];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<VentasDiariasComponent>,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      tipo: [null, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      ... this.form.value,
      fecha: fecha.toISOString(),
    };
    this.dialogRef.close(res);
  }

}
