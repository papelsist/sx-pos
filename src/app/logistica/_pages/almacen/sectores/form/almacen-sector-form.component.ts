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
import { SectorDetDialogComponent } from './sector-det-dialog.component';
import { Sector } from 'app/logistica/models/sector';
import { SectorDet } from 'app/logistica/models/sectorDet';


@Component({
  selector: 'sx-almacen-sector-form',
  templateUrl: 'almacen-sector-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlmacenSectorFormComponent implements OnInit, OnChanges {


  form: FormGroup;

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<any>();

  @Input() sector: Sector;

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
    if (changes.sector && !changes.sector.isFirstChange()) {
      const sector: Sector = changes.sector.currentValue;
      this.form.patchValue({
        id: sector.id,
        sectorFolio: sector.sectorFolio,
        responsable1: sector.responsable1,
        responsable2: sector.responsable2,
        comentario: sector.comentario,
      });
      this.form.get('sectorFolio').disable()
      sector.partidas.forEach( item => this.insertarPartida(item));
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      sectorFolio: [null, Validators.required],
      responsable1: ['', [Validators.required, Validators.maxLength(100)]],
      responsable2: ['', [Validators.required, Validators.maxLength(100)]],
      comentario: ['', [Validators.maxLength(100)]],
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
    const dialogRef = this.dialog.open(SectorDetDialogComponent, {
      data: {sucursal: this.sucursal, inserted: this.inserted}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const det = {
          producto: result.existencia.producto,
          comentario: result.comentario,
          cantidad: 0
        };
        this.insertarPartida(det);
      }
    });
  }

  insertarPartida(det: SectorDet) {
    this.partidas.push(new FormControl(det));
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
    return this.disabled ? 'Sector para conteo de inventario' : 'Alta de sector para conteo de inventario';
  }

  get id() {
    return this.form.get('id').value;
  }


}
