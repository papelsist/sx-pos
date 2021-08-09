import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

import { Sucursal } from 'app/models';
import { Embarque } from 'app/logistica/models/embarque';

@Component({
  selector: 'sx-embarque-form',
  templateUrl: 'embarque-form.component.html',
  styleUrls: ['./embarque-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmbarqueFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  isPatin: boolean;

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<any>();

  @Input() embarque: Embarque;

  @Input() readonly = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.buildForm();
    this.form.valueChanges.subscribe(data => {
      if(data.chofer ){
          this.isPatin=data.chofer.id==='3ba15bf0-e40e-11e7-b1f8-b4b52f67eab0';
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.embarque && !changes.embarque.isFirstChange()) {
      const embarque: Embarque = changes.embarque.currentValue;
      this.form.patchValue(embarque);
      // embarque.partidas.forEach( item => this.insertarPartida(item));
    }
   
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [{ value: this.sucursal, disabled: true }, Validators.required],
      fecha: [new Date(), Validators.required],
      chofer: [null, Validators.required],
      comentario: ['', [Validators.maxLength(100)]],
      empleado:[null],
      partidas: this.fb.array([])
    });
  }

  onSubmit() {

    if (this.form.valid) {
      const entity = this.prepareEntity();
      this.save.emit(entity);
    }
  }

  private prepareEntity() {
    return {
      ...this.form.getRawValue()
    };
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  removePartida(index: number) {
    this.partidas.removeAt(index);
  }

  insertar() {}

  

  // insertarPartida(det: SectorDet) {
  //   this.partidas.push(new FormControl(det));
  //   this.cd.detectChanges();
  // }

  // editarPartida($event) {
  //   const {row, cantidad} = $event;
  //   this.partidas.controls[row].patchValue({cantidad: cantidad});
  // }

  // onDelete(index: number) {
  //   this.removePartida(index);
  //   this.cd.detectChanges();
  // }

  get title() {
    return ' Alta de embarque';
  }

  get id() {
    return this.form.get('id').value;
  }

  get fecha() {
    return this.form.get('fecha').value;
  }
}
