import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef,
  OnChanges, SimpleChanges
} from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators, FormControl, AbstractControl} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

import { Sucursal } from 'app/models';
import { CapturaDetDialogComponent } from './captura-det-dialog.component';
import { Conteo } from 'app/logistica/models/conteo';
import { ConteoDet } from 'app/logistica/models/conteoDet';


@Component({
  selector: 'sx-captura-form',
  templateUrl: 'captura-form.component.html',
  styleUrls: ['./captura-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapturaFormComponent implements OnInit, OnChanges {


  form: FormGroup;

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<any>();

  @Input() conteo: Conteo;

  @Input() disabled =  false;

  inserted: string[] = [];

  subscription1: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.conteo && !changes.conteo.isFirstChange()) {
      const conteo: Conteo = changes.conteo.currentValue;
      this.form.patchValue({
        id: conteo.id,
        fecha: conteo.fecha,
        sector: conteo.sector,
        sucursal: conteo.sucursal,
        auditor1: conteo.auditor1,
        auditor2: conteo.auditor2,
        capturista: conteo.capturista,
        contador1: conteo.contador1,
        contador2: conteo.contador2,
        comentario: conteo.comentario,
      });
      conteo.partidas.forEach( item => this.insertarPartida(item));
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      sector: [null, Validators.required],
      fecha: [null, Validators.required],
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      auditor1: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(100)]],
      auditor2: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(100)]],
      contador1: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(100)]],
      contador2: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(100)]],
      capturista: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(100)]],
      comentario: [{value: '', disabled: false}, [Validators.maxLength(100)]],
      partidas: this.fb.array([])
    });

    if (this.disabled) {
      this.form.disable();
    }

    this.subscription1 = this.form.get('partidas')
      .valueChanges
      .map( (value: Array<any> )  => _.map(value, item => item.producto.clave) )
      .subscribe( values => this.inserted = values);

  }

  onSubmit() {
    if (this.form.valid) {
      const entity = this.prepareEntity();
      this.save.emit(entity);
    }
  }

  private prepareEntity() {
    return {
      ...this.form.getRawValue(),
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray
  }

  removePartida(index: number) {
    this.partidas.removeAt(index);
  }

  insertar() {
    const dialogRef = this.dialog.open(CapturaDetDialogComponent, {
      data: {sucursal: this.sucursal, inserted: this.inserted}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const det = {
          producto: result.existencia.producto,
          cantidad: result.cantidad,
        };
        this.insertarPartida(det);
      }
    });
  }

  insertarPartida(det: ConteoDet) {
    this.partidas.push(new FormControl(det));
    /*this.partidas.push(this.fb.group({
      producto: [det.producto, Validators.required],
      cantidad: [det.cantidad, Validators.required]
    }))*/
    this.cd.detectChanges();
  }

  editarPartida($event) {
    const {row, cantidad} = $event;
    this.partidas.controls[row].patchValue({cantidad: cantidad});
  }

  onDelete(index: number) {
    console.log('Eliminando partida');
    this.removePartida(index);
  }

  get title() {
    return 'Captura de conteo físico ';
  }

  get id() {
    return this.form.get('id').value;
  }

  get sector() {
    return this.form.get('sector').value
  }
  get fecha() {
    return this.form.get('fecha').value;
  }


}
