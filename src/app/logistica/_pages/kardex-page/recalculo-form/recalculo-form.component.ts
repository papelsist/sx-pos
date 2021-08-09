import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'sx-recalculo-form',
  templateUrl: './recalculo-form.component.html',
  styles: [`
    .recalculo-form {
      height: 150px;
      width: 650px;
    }
  `,]
})
export class RecalculoFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<RecalculoFormComponent>,
  ) { }
  
  ngOnInit() {
    this.form = this.fb.group({
      producto: ['', Validators.required],
      todos: [false]
    });
    this.form.get('todos').valueChanges.subscribe( val => {
      console.log('Todos los productos: ', val)
      val ? this.form.get('producto').disable() : this.form.get('producto').enable()
    });
  }

  ngOnDestroy() {

  }
  
  close() {
    this.dialogRef.close();
  }
  
  doAccept() {
    const producto = this.form.get('producto').value;
    const todos = this.form.get('todos').value;
    const res = {
      producto: producto,
      todos: todos
    };
    console.log('Parametros definidos para el recalculo: ', res);
    this.dialogRef.close(res);
  }

}
