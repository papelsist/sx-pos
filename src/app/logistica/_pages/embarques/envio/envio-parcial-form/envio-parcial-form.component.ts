import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef,
  OnChanges, SimpleChanges
} from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

import { Sucursal } from 'app/models';
import { Embarque } from 'app/logistica/models/embarque';
import { Envio } from 'app/logistica/models/envio';

import { VentaDet } from 'app/models/ventaDet';
import {EnviodetSelectorDialogComponent} from './selector/enviodet-selector-dialog.component';

@Component({
  selector: 'sx-envio-parcial-form',
  templateUrl: './envio-parcial-form.component.html',
  styleUrls: ['./envio-parcial-form.component.scss']
})
export class EnvioParcialFormComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Output() update = new EventEmitter<any>();

  @Input() envio: Envio;

  @Input() partidasDeVenta: VentaDet[];

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.envio && !changes.envio.isFirstChange()) {
      const envio: Envio = changes.envio.currentValue;
      envio.parcial = true;
      this.form.patchValue(envio);
      _.forEach(envio.partidas, item => this.insertarEnvioDet(item));
    }
  }

  buildForm() {
    this.form = this.fb.group({
      parcial: [true, Validators.required],
      embarque: [null, Validators.required],
      partidas: this.fb.array([])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const entity = this.prepareEntity();
      this.update.emit(entity);
    }
  }

  insertar() {
    const dialogRef = this.dialog.open(EnviodetSelectorDialogComponent, {
      data: {envio: this.envio, partidasDeVenta: this.partidasDeVenta}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        _.forEach(result.partidas, item => this.insertarEnvioDet(item));
      }
    });
  }

  insertarEnvioDet(envioDet) {
    this.partidas.push(new FormControl(envioDet));
    this.cd.markForCheck();
  }

  onEdit($event) {
    this.cd.markForCheck();
  }

  private prepareEntity() {
    return {
      id: this.envio.id,
      instruccionEntregaParcial: 'ND',
      ...this.form.getRawValue(),
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray
  }

  onDelete(index: number) {
    this.partidas.removeAt(index);
  }

  get title() {
    return ' Mantenimiento de envio parcial'
  }

  get embarque() {
    return this.form.get('embarque').value
  }

}


