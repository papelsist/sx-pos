import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'sx-relacion-tps',
  templateUrl: './relacion-tps.component.html',
  styleUrls: ['./relacion-tps.component.scss']
})
export class RelacionTpsComponent implements OnInit {

  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<RelacionTpsComponent>,
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
