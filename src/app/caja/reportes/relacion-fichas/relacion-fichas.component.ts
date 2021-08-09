import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'sx-relacion-fichas',
  templateUrl: './relacion-fichas.component.html',
  styles: []
})
export class RelacionFichasComponent implements OnInit {

  form: FormGroup;
  
  tipos = ['CON','COD'];
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<RelacionFichasComponent>,
  ) { }
  
  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      tipo: [null, Validators.required]
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
