import { Component, OnInit, Inject } from '@angular/core';
import {MdDialogRef,MD_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sx-soporte-show',
  templateUrl: './soporte-show.component.html',
  styleUrls: ['./soporte-show.component.scss']
})
export class SoporteShowComponent implements OnInit {

    solicitud;

  campos = {
    sucursal: [{value: ''}, Validators.required],
    fecha: [],
    modulo: [{value: ''}, Validators.required],
    descripcion: [{value: ''}, Validators.required],
    comentario: [{value: ''}, Validators.required],
    documento: [{value: ''}, Validators.required],
    usuario: [{value: ''}, Validators.required],
    estado: [{value: ''}, Validators.required],
    autorizo: [{value: ''}, Validators.required],
    atendio: [{value: ''}, Validators.required],
    comentarioAutorizacion: [{value: ''}, Validators.required],
    comentarioAtencion: [{value: ''}, Validators.required],
   };

  form: FormGroup;

  constructor(public dialogRef: MdDialogRef<SoporteShowComponent>, @Inject(MD_DIALOG_DATA  ) public data: any, private fb: FormBuilder) {
    console.log('Data ... ', this.data);
    this.solicitud = this.data.solicitud;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group(this.campos);
  }
  close() {
    this.dialogRef.close();
  }

}
