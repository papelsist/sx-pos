import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'sx-conteo-det-dialog',
  templateUrl: './conteo-det-dialog.component.html',
  styles: [`
    .exis-form {
      width: 550px;
    }
  `
  ]
})
export class ConteoDetDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;

  sucursal;

  inserted: string[] = [];

  constructor(
    public dialogRef: MdDialogRef<ConteoDetDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.sucursal = data.sucursal;
    this.inserted = data.inserted;
  }

  ngOnInit() {
    this.form = this.fb.group({
      sucursal: [{ value: this.sucursal, disabled: true}, Validators.required],
      existencia: [null, Validators.required],
      cantidad: [0, [Validators.required]]
    });
  }

  ngOnDestroy(): void {}

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    this.dialogRef.close(this.form.getRawValue());
  }

}
