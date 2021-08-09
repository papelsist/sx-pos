import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'sx-discrepancias',
  templateUrl: './discrepancias.component.html',
  styleUrls: ['./discrepancias.component.scss']
})
export class DiscrepanciasComponent implements OnInit {
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<DiscrepanciasComponent>,
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
 