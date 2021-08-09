import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Banco } from 'app/models';
import * as _ from 'lodash';

@Component({
  selector: 'sx-cambio-de-cheque-dialog',
  templateUrl: './cambio-de-cheque-dialog.component.html',
  styleUrls: ['./cambio-de-cheque-dialog.component.scss']
})
export class CambioDeChequeDialogComponent implements OnInit {

  form: FormGroup;
  bancos: Banco[] = [];

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<CambioDeChequeDialogComponent>,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      fecha: [{value: new Date(), disabled: false}, Validators.required],
      importe: [0.0, [Validators.required, Validators.min(1)]],
      emisor: ['', Validators.required],
      nombre:['', Validators.required],
      numero: [0, Validators.required],
      banco: [null, Validators.required],
      cuenta: [null, Validators.required],
      comentario: ['']
    });
  }

  ngOnInit() {
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    if (this.form.valid) {
      const tfecha: Date = this.form.get('fecha').value;
      const imp = this.form.get('importe').value;
      const corte = {
        ... this.form.getRawValue(),
        fecha: tfecha.toISOString(),
        importe: _.toNumber(imp)
      }
      // console.log('Salvando entidad: ', corte);
      this.dialogRef.close(corte);
    }
  }


}
