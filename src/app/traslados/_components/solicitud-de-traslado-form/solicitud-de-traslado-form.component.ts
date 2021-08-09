import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {MdDialog} from '@angular/material';

import {SolicitudDeTraslado} from 'app/logistica/models/solicitudDeTraslado';
import {SolicitudDeTrasladoDet} from 'app/logistica/models/solicitudDeTrasladoDet';
import {Sucursal} from 'app/models';

import * as _ from 'lodash';
import {SoldetAddComponent} from 'app/traslados/_components/soldet-add/soldet-add.component';

export const PartidasValidator = (control: AbstractControl): {[key: string]: boolean} => {
  const partidas = (control.get('partidas') as FormArray).value;
  return partidas.length ? null : { sinPartidas: true };
};

@Component({
  selector: 'sx-solicitud-de-traslado-form',
  templateUrl: './solicitud-de-traslado-form.component.html',
})
export class SolicitudDeTrasladoFormComponent implements OnInit {

  form: FormGroup;

  @Input() fecha = new Date();

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<SolicitudDeTraslado>();

  inserted$: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      sucursalSolicita: [{value: this.sucursal, disabled: true}, Validators.required],
      sucursalAtiende: [null, Validators.required],
      fecha: [{value: this.fecha, disabled: true}, Validators.required],
      comentario: ['', [Validators.maxLength(100)]],
      partidas: this.fb.array([])
    }, {validator: PartidasValidator});

    this.inserted$ = this.form.get('partidas')
      .valueChanges
      .map( (value: Array<SolicitudDeTrasladoDet> )  => _.map(value, item => item.producto.clave) )

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
    if (this.atiende()) {
      const dialogRef = this.dialog.open(SoldetAddComponent, {
        data: {sucursal: this.atiende()}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.insertarPartida(result);
        }
      });
    }
  }

  insertarPartida(det) {
    const fg = this.fb.group({
      producto: {
        id: det.existencia.producto.id,
        clave: det.existencia.producto.clave,
        descripcion: det.existencia.producto.descripcion
      },
      solicitado: det.cantidad,
      cortesInstruccion: det.cortesInstruccion
    });
    this.partidas.push(fg);
    this.cd.detectChanges();
  }

  editarPartida($event) {
    const {row, solicitado} = $event;
    this.partidas.controls[row].patchValue({solicitado: solicitado});
  }

  onDelete(index: number) {
    this.removePartida(index);
  }

  atiende(): Sucursal {
    return this.form.get('sucursalAtiende').value;
  }

}
