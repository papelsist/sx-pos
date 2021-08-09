import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';

import { ComplementoIne, ENTIDADES } from 'app/models/complementoIne';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-complemento-form',
  templateUrl: './complemento-form.component.html',
  styleUrls: ['./complemento-form.component.scss']
})
export class ComplementoFormComponent implements OnInit {
  @Input() venta: Venta;
  @Output() save = new EventEmitter();
  @Output() update = new EventEmitter();

  form: FormGroup;
  entidadForm: FormGroup;
  tiposDeEntidades = ENTIDADES;
  entidadControl: FormControl;
  contabilidadControl = new FormControl();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    if (this.venta.complementoIne) {
      const complemento = this.venta.complementoIne;
      console.log('Editando complemento: ', complemento);
      this.form.patchValue(complemento);
      complemento.partidas.forEach(item => {
        this.partidas.push(new FormControl(item));
      });
    }
    this.buildEntidadForm();
  }

  buildForm() {
    this.form = this.fb.group({
      tipoDeProceso: [null, Validators.required],
      tipoDeComite: [null],
      contabilidad: [null],
      partidas: this.fb.array([])
    });
  }

  buildEntidadForm() {
    this.entidadForm = this.fb.group({
      clave: [null, Validators.required],
      ambito: [null],
      contabilidad: this.fb.array([])
    });
  }

  onSubmit() {
    const res = {
      venta: this.venta.id,
      ...this.form.value
    };
    if (this.venta.complementoIne && this.venta.complementoIne.id) {
      res.id = this.venta.complementoIne.id;
      this.update.emit(res);
    } else {
      this.save.emit(res);
    }
  }

  agregarEntidad() {
    if (this.entidadForm.valid) {
      const entidad = {
        ...this.entidadForm.value
      };
      this.partidas.push(new FormControl(entidad));
      this.form.markAsDirty();
      this.entidadForm.reset();
    }
  }

  eliminarEntidad(index: number) {
    this.partidas.removeAt(index);
    this.selectEntidad(null);
    this.form.markAsDirty();
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  selectEntidad(index: number) {
    const control = this.partidas.at(index) as FormControl;
    this.entidadControl = control;
  }

  get currentEntidad() {
    return this.entidadControl ? this.entidadControl.value : null;
  }

  agregarContabilidad(contabilidad: number) {
    const entidad = this.currentEntidad;
    entidad.contabilidad.push(contabilidad);
    this.form.markAsDirty();
  }

  deleteContabilidad(index: number) {
    if (this.currentEntidad) {
      const entidad = this.currentEntidad;
      entidad.contabilidad.splice(index, 1);
      this.form.markAsDirty();
    }
  }
}
