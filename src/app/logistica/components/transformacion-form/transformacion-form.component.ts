import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { TransformaciondetDialogComponent } from './transformaciondet-dialog/transformaciondet-dialog.component';

import { Sucursal } from 'app/models';

@Component({
  selector: 'sx-transformacion-form',
  templateUrl: './transformacion-form.component.html',
  styleUrls: ['./transformacion-form.component.scss']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransformacionFormComponent implements OnInit {
  tipos = [
    { clave: 'TRS', descripcion: 'Transformación' },
    { clave: 'REC', descripcion: 'Reclasificación' },
    { clave: 'MAQ', descripcion: 'Maquila' }
  ];

  form: FormGroup;

  @Output()
  save = new EventEmitter();

  @Output()
  cancel = new EventEmitter();

  @Input()
  sucursal: Sucursal;

  constructor(private fb: FormBuilder, public dialog: MdDialog) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      sucursal: [{ value: this.sucursal, disabled: 'true' }],
      fecha: [{ value: this.fecha, disabled: 'true' }],
      tipo: [null, Validators.required],
      porInventario: [false, Validators.required],
      comentario: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ]
      ],
      partidas: this.fb.array([])
    });

    this.form.get('partidas').valueChanges.subscribe(partidas => {
      if (partidas.length > 0) this.form.get('tipo').disable();
      else this.form.get('tipo').enable();
    });
  }

  get fecha() {
    return new Date();
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  insertPartida(partida) {
    console.log('Insertando partida: ', partida);
    this.partidas.push(new FormControl(partida));
  }

  insertar() {
    if (this.form.get('tipo').value === null) return;

    let dialogRef = this.dialog.open(TransformaciondetDialogComponent, {
      data: { sucursal: this.sucursal, tipo: this.form.get('tipo').value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let index = this.partidas.length + 1;
        const salida = Object.assign({}, result.salida);
        salida.cantidad = salida.cantidad * -1;
        salida.cortes = result.cortes;
        salida.cortesInstruccion = result.instruccion;
        salida.comentario = result.comentario;
        salida.index = index;
        salida.sw2 = index;

        const entrada = Object.assign({}, result.entrada);
        salida.cantidad = salida.cantidad * 1;
        entrada.index = index;
        entrada.sw2 = index;
        entrada.comentario = result.comentario;

        this.partidas.push(new FormControl(salida));
        this.partidas.push(new FormControl(entrada));
      }
    });
  }

  removePartida(index: number) {
    this.partidas.removeAt(index);
    this.partidas.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      const trs = this.prepareEntity();
      this.save.emit(trs);
    }
  }

  prepareEntity() {
    const entity = Object.assign({}, this.form.getRawValue());

    const partidas = this.form.get('partidas').value;
    partidas.forEach(element => {
      element.producto = element.producto.id;
    });
    return {
      ...entity,
      partidas
    };
  }
}
