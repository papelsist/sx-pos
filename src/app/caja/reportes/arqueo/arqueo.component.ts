import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'sx-arqueo',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 md-dialog-title>
        Reporte de Arqueo
      </h4>
      <div layout="column" class="selector-form" >
        <md-form-field flex>
          <input mdInput [mdDatepicker]="picker" placeholder="Fecha" formControlName="fecha">
          <md-datepicker-toggle mdSuffix [for]="picker"></md-datepicker-toggle>
          <md-datepicker #picker></md-datepicker>
        </md-form-field>
      </div>

      <md-dialog-actions>
        <button md-button class="accent" type="submit" [disabled]="form.invalid" >Aceptar</button>
        <button md-button type="button" (click)="close()" >Cancelar</button>
      </md-dialog-actions>
    </form>

  `,
  styles: []
})
export class ArqueoComponent implements OnInit {

  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<ArqueoComponent>,
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
    const res = fecha.toISOString()
    this.dialogRef.close(res);
  }

}
