import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'sx-existencia-form',
  templateUrl: './existencia-form.component.html',
  styles: []
})
export class ExistenciaFormComponent implements OnInit {
  
  form: FormGroup;
  recorte
  recorteComentario

  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<ExistenciaFormComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.recorte = data.recorte;
    this.recorteComentario = data.recorteComentario
   }

  ngOnInit() {
    this.form = this.fb.group({
      recorte: [this.recorte, Validators.required],
      recorteComentario: [ this.recorteComentario, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      const recorte = this.form.get('recorte').value;
      const res = {
        recorteComentario: this.form.get('recorteComentario').value,
        recorte: _.toNumber(recorte)
      };
      this.dialogRef.close(res);
    }
  }

}
