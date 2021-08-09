import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'sx-kardex-form',
  templateUrl: './kardex-form.component.html',
  styleUrls: ['./kardex-form.component.scss']
})
export class KardexFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<KardexFormComponent>,
  ) { }
  
  ngOnInit() {
    this.form = this.fb.group({
      fechaInicial: [null, Validators.required],
      fechaFinal: [new Date(), Validators.required],
      producto: ['', Validators.required],
    });
    this.form.get('fechaInicial').valueChanges.subscribe( (value: Date) => console.log('Fecha Inicial: ', value.toJSON()));
    this.form.get('fechaFinal').valueChanges.subscribe( (value: Date) => console.log('Fecha Final: ', value.toISOString()));
  }
  
  close() {
    this.dialogRef.close();
  }
  
  doAccept() {
    const fechaInicial: Date = this.form.get('fechaInicial').value;
    const fechaFinal: Date = this.form.get('fechaFinal').value;
    const producto = this.form.get('producto').value;
    const res = {
      producto: producto,
      fechaInicial: fechaInicial.toJSON(),
      fechaFinal: fechaFinal.toISOString(),
    };
    console.log('Parametros definidos para el reporte: ', res);
    this.dialogRef.close(res);
  }

}
