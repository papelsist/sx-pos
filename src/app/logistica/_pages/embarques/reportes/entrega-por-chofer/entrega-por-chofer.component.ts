import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'sx-entrega-por-chofer',
  templateUrl: './entrega-por-chofer.component.html',
  styleUrls: ['./entrega-por-chofer.component.scss']
})
export class EntregaPorChoferComponent implements OnInit {

  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<EntregaPorChoferComponent>,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      chofer: [null, Validators.required]
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
      chofer: this.form.get('chofer').value.id
    };
    this.dialogRef.close(res);
  }

}
