import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'sx-soles-pendientes',
  templateUrl: './soles-pendientes.component.html',
  styleUrls: ['./soles-pendientes.component.scss']
})
export class SolesPendientesComponent implements OnInit {

  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<SolesPendientesComponent>,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fechaIni: [new Date(), Validators.required],
      fechaFin: [new Date(), Validators.required]

    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fechaIni: Date = this.form.get('fechaIni').value;
    const fechaFin: Date = this.form.get('fechaFin').value;
    const res = {
      ... this.form.value,
      fechaIni: fechaIni.toISOString(),
      fechaFin: fechaFin.toISOString(),   
    };
    this.dialogRef.close(res);
  }


}
