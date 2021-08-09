import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  HostListener
} from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

import { Compra, CompraDet, Sucursal } from 'app/models';
import { ProveedoresService } from 'app/compras/services/proveedores.service';
import { OrdendetAddDialogComponent } from '../ordendet-add-dialog/ordendet-add-dialog.component';

export const PartidasValidator = (
  control: AbstractControl
): { [key: string]: boolean } => {
  const partidas = (control.get('partidas') as FormArray).value;
  return partidas.length ? null : { noPartidas: true };
};

@Component({
  selector: 'sx-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<Compra>();

  @Input() fecha = new Date();

  @Input() compra: Compra;

  subscription1: Subscription;

  selected: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private service: ProveedoresService,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
    if (this.compra) {
      this.form.patchValue({
        proveedor: this.compra.proveedor,
        comentario: this.compra.comentario,
        fecha: this.compra.fecha
      });
      this.form.get('proveedor').disable();
      _.forEach(this.compra.partidas, item => {
        this.partidas.push(new FormControl(item));
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
  }

  buildForm() {
    this.form = this.fb.group(
      {
        proveedor: [null, Validators.required],
        sucursal: [{ value: this.sucursal, disabled: true }],
        fecha: [{ value: new Date(), disabled: true }, Validators.required],
        entrega: [new Date(), Validators.required],
        especial: [false],
        partidas: this.fb.array([]),
        comentario: ['', Validators.maxLength(100)]
      },
      {
        validator: PartidasValidator
      }
    );

    this.subscription1 = this.form
      .get('partidas')
      .valueChanges.map(value => _.map(value, 'producto.clave'))
      .subscribe((value: any) => {
        this.selected = value;
        // console.log('Selected: ', this.selected);
      });

    // this.selected$.subscribe( selected => console.log('Selected: ', selected));
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  insertar() {
    const dialogRef = this.dialog.open(OrdendetAddDialogComponent, {
      data: {
        proveedor: this.proveedor,
        selected: this.selected
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const compraDet = {
          ...result,
          producto: result.producto.producto
        };
        this.agregarCompraDet(compraDet);
      }
    });
  }

  agregarCompraDet(det: CompraDet) {
    det.sucursal = this.sucursal;
    det.sw2 = 'SIIPAPX';
    this.partidas.push(new FormControl(det));
    this.cd.markForCheck();
  }

  onEdit(row) {
    const partida = this.partidas.controls[row].value;
    const dialogRef = this.dialog.open(OrdendetAddDialogComponent, {
      data: {
        proveedor: this.proveedor,
        selected: this.selected,
        partida: partida
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        partida.producto = result.producto.producto;
        partida.solicitado = result.solicitado;
        partida.comentario = result.comentario;
        this.cd.markForCheck();
      }
    });
  }

  onDelete(index: number) {
    this.partidas.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      const compra = this.prepareEntity();
      this.save.emit(compra);
    }
  }

  private prepareEntity() {
    if (!this.compra) {
      return this.form.getRawValue();
    } else {
      const res = {
        ...this.compra,
        ...this.form.value,
        partidas: this.partidas.value
      };
      return res;
    }
  }

  get proveedor() {
    return this.form.get('proveedor').value;
  }

  disableAddPartidas() {
    return this.proveedor === null;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.ctrlKey && event.code === 'KeyI') {
      this.insertar();
    }
    if (event.code === 'Insert') {
      this.insertar();
    }
  }
}
