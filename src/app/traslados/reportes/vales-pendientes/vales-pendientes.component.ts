import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'sx-vales-pendientes',
  templateUrl: './vales-pendientes.component.html',
  styleUrls: ['./vales-pendientes.component.scss']
})
export class ValesPendientesComponent implements OnInit {

  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<ValesPendientesComponent>,
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
