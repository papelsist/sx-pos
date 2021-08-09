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
import { SectoresService } from 'app/logistica/services/sectores/sectores.service';


@Component({
  selector: 'sx-almacen-sector-form',
  templateUrl: 'almacen-sector-form.component.html',
  styleUrls:['./almacen-sector-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlmacenSectorFormComponent implements OnInit, OnChanges {


  form: FormGroup;

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<any>();

  @Input() sector: Sector;

  @Input() disabled =  false;

  @Output() delete = new EventEmitter<any>();
  

  inserted: string[] = [];

  subscription1: Subscription;

  procesando = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private service: SectoresService
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
      // const sortedPartidas = _.sortBy(sector.partidas, ['indice'])
      sector.partidas.forEach( item => this.insertarPartida(item));
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      sectorFolio: [null, Validators.required],
      responsable1: ['', [Validators.required, Validators.maxLength(100)]],
      responsable2: [''],
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
          producto: result.producto,
          comentario: result.comentario,
          cantidad: 0,
          indice: result.indice,
          subsector: result.indice
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
    this.removePartida(index);
    // console.log('Eliminando partida');
    this.cd.detectChanges();
    // console.log('Entidad: ', this.form.getRawValue());
  }

  get title() {
    return this.disabled ? 'Sector para conteo de inventario' : 'Alta de sector para conteo de inventario';
  }

  get id() {
    return this.form.get('id').value;
  }

  print(id: string) {
    console.log('Imprimiendo sector: ', id);
    this.service.print(id)
      .do( () => this.procesando = true)
      .finally( () => this.procesando = false)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.log(error2));
  }


}
