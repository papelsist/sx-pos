import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Compra } from '../../../models/compra';

@Component({
  selector: 'sx-orden-recepcion-dialog',
  templateUrl: './orden-recepcion-dialog.component.html',
  styleUrls: ['./orden-recepcion-dialog.component.scss']
})
export class OrdenRecepcionDialogComponent implements OnInit {
  form: FormGroup;
  
  compra: Compra;

  constructor(public dialogRef: MdDialogRef<OrdenRecepcionDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  ngOnInit() {
      
    this.compra=this.data.compra;
    this.form = this.fb.group({
      remision: ['', Validators.required],
      fechaRemision: [null, Validators.required],
      comentario: ['', [Validators.maxLength(100)]],
    });
  }

onSubmit(){
  
  this.dialogRef.close(this.form.value);


}

cancelar(){
  this.dialogRef.close();
}




}
