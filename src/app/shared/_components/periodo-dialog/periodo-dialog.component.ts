import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Periodo } from 'app/models/periodo';

@Component({
  selector: 'sx-periodo-dialog',
  template: `
  <h2 md-dialog-title>{{title}}</h2>
  <md-dialog-content>
  <form [formGroup]="form" >
    <md-form-field >
      <input mdInput [mdDatepicker]="myDatepicker" placeholder="Fecha inicial" formControlName="fechaInicial">
      <md-datepicker-toggle mdSuffix [for]="myDatepicker"></md-datepicker-toggle>
      <md-datepicker #myDatepicker></md-datepicker>
    </md-form-field>
    <md-form-field >
      <input mdInput [mdDatepicker]="myDatepicker2" placeholder="Fecha final" formControlName="fechaFinal">
      <md-datepicker-toggle mdSuffix [for]="myDatepicker2"></md-datepicker-toggle>
      <md-datepicker #myDatepicker2></md-datepicker>
    </md-form-field>
  </form>
  </md-dialog-content>
  <md-dialog-actions>
    <button md-button (click)="close()">Cancelar</button>
    <button md-button type="button" (click)="onSubmit()" [disabled]="form.invalid">Aceptar</button>
  </md-dialog-actions>
`
})
export class PeriodoDialogComponent implements OnInit {
  periodo: Periodo;
  form: FormGroup;
  title;

  constructor(
    public dialogRef: MdDialogRef<PeriodoDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data.title || 'Seleccione un periodo';
    this.periodo = data.periodo || new Periodo();
    this.buildForm();
    this.form.setValue(this.periodo);
  }

  buildForm() {
    this.form = this.fb.group({
      fechaInicial: [new Date().toISOString(), Validators.required],
      fechaFinal: [new Date().toISOString(), Validators.required]
    });
  }

  getPeriodo() {
    if (this.form.valid) {
      const fechaInicial = this.form.get('fechaInicial').value as Date;
      const fechaFinal = this.form.get('fechaFinal').value as Date;
      return new Periodo(fechaInicial, fechaFinal);
    }
    return null;
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.getPeriodo());
    }
  }

  close() {
    this.dialogRef.close();
  }
}
