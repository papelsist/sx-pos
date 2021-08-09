import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'sx-cobranza-camioneta',
  templateUrl: './cobranza-camioneta.component.html'
})
export class CobranzaCamionetaComponent implements OnInit {
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<CobranzaCamionetaComponent>,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
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
