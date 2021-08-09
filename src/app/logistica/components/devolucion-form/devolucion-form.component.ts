import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Sucursal } from 'app/models';
import { DevolucionDeVenta } from 'app/logistica/models/devolucionDeVenta';
import { DevolucionDeVentaDet } from 'app/logistica/models/devolucionDeVentaDet';
import { SelectorDeVentasDialogComponent } from './selector-de-ventas/selector-de-ventas-dialog.component';
import { Venta } from 'app/models/venta';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { VentaDet } from 'app/models/ventaDet';

@Component({
  selector: 'sx-devolucion-form',
  templateUrl: 'devolucion-form.component.html',
  styleUrls: ['devolucion-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevolucionFormComponent implements OnInit {
  form: FormGroup;

  @Input()
  fecha = new Date();

  @Input()
  sucursal: Sucursal;

  @Output()
  save = new EventEmitter<DevolucionDeVenta>();

  ventaDetSelected$: Observable<VentaDet[]>;

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
      sucursal: [{ value: this.sucursal, disabled: true }, Validators.required],
      fecha: [{ value: this.fecha, disabled: true }, Validators.required],
      comentario: ['', [Validators.maxLength(100)]],
      venta: [null, Validators.required],
      partidas: this.fb.array([])
    });

    this.ventaDetSelected$ = this.form
      .get('partidas')
      .valueChanges.map((value: Array<DevolucionDeVentaDet>) =>
        _.map(value, item => item.ventaDet)
      );
  }

  onSubmit() {
    console.log('Salvando devolucion......');
    if (this.form.valid) {
      const entity = this.prepareEntity();
      this.save.emit(entity);
    }
  }

  private prepareEntity() {
    const entity = this.form.getRawValue();

    const partidas = this.form.get('partidas').value;
    partidas.forEach(element => {
      element.producto = element.producto.id;
    });
    return {
      ...entity,
      partidas
    };
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  removePartida(index: number) {
    this.partidas.removeAt(index);
  }

  asignarVenta(venta: Venta) {
    if (!this.venta) {
      this.form.patchValue({ venta: venta });
    }
  }

  insertar() {
    let dialogRef = this.dialog.open(SelectorDeVentasDialogComponent, {
      data: { sucursal: this.sucursal, venta: this.venta }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Asignando venta....', result);
        if (!this.venta) this.asignarVenta(result.venta);
        result.partidas.forEach(element => {
          this.insertarVentaDet(element);
        });
        this.cd.markForCheck();
      }
    });
  }

  insertarVentaDet(ventaDet) {
    const fg = this.fb.group({
      ventaDet: ventaDet,
      cantidad: [ventaDet.disponibleParaDevolucion, Validators.required],
      producto: {
        id: ventaDet.producto.id,
        clave: ventaDet.producto.clave,
        descripcion: ventaDet.producto.descripcion
      }
    });
    this.partidas.push(fg);
  }

  get venta() {
    return this.form.get('venta').value;
  }

  editarPartida($event) {
    console.log('Editando: ', $event);
    const { row, cantidad } = $event;

    this.partidas.controls[row].patchValue({ cantidad: cantidad });
  }

  onDelete(index: number) {
    this.removePartida(index);
  }
}
