import { Component, Input, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'sx-soldet-add',
  templateUrl: './soldet-add.component.html',
  styleUrls: ['./soldet-add.component.scss']
})
export class SoldetAddComponent implements OnInit, OnDestroy {

  form: FormGroup;

  sucursal;

  disponible = 0;

  subscription: Subscription;

  selected: string[] = [];

  constructor(
    public dialogRef: MdDialogRef<SoldetAddComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.sucursal = data.sucursal;
    this.selected = data.selected;
  }

  ngOnInit() {
    this.form = this.fb.group({
      sucursalAtiende: [{ value: this.sucursal, disabled: true}, Validators.required],
      existencia: [null, Validators.required],
      cantidad: [0.0, [Validators.required, this.validateCantidad(), Validators.min(1)]],
      cortesInstruccion:[null]

    });
    this.subscription = this.form.get('existencia').valueChanges.subscribe( exis => {
      if (exis) {
        this.disponible = exis.cantidad;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    this.dialogRef.close(this.form.getRawValue());
  }

  validateCantidad(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      return control.value > this.disponible ? {'eixstenciaInsuficciente': {value: control.value}} : null;
    };
  }

}

