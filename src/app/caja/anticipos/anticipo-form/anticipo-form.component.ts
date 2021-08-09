import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
  FormControl
} from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import * as moment from 'moment';

import { MdDialog } from '@angular/material';

// import { CobrochequeFormComponent } from '../cobrocheque-form/cobrocheque-form.component';
// import { CobrotarjetaFormComponent } from '../cobrotarjeta-form/cobrotarjeta-form.component';
import { Cobro } from 'app/models/cobro';
import { ChequeFormComponent } from 'app/caja/facturacion/cobro/cheque-form/cheque-form.component';
import { TarjetaFormComponent } from 'app/caja/facturacion/cobro/tarjeta-form/tarjeta-form.component';

@Component({
  selector: 'sx-anticipo-form',
  templateUrl: './anticipo-form.component.html',
  styles: []
})
export class AnticipoFormComponent implements OnInit, OnChanges, OnDestroy {
  form: FormGroup;

  @Output() cancel = new EventEmitter();

  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() print = new EventEmitter();

  @Input() cobro: Cobro;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder, private dialog: MdDialog) {
    this.buildForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cobro) {
      // console.log('Editando nota de cargo: ', changes.nota);
      this.form.patchValue(this.cobro);
      this.form.get('cliente').disable();
      this.form.get('formaDePago').disable();
      this.form.disable();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      cliente: [null, Validators.required],
      fecha: [new Date(), Validators.required],
      tipo: ['COD', Validators.required],
      importe: [{ value: null, disabled: false }, [Validators.required]],
      formaDePago: ['EFECTIVO', Validators.required],
      comentario: null
    });
    this.subscribers();
  }

  private subscribers() {}

  prepareEntity() {
    const cliente = this.form.get('cliente').value;
    const fecha: Date = this.form.get('fecha').value;
    const entity = {
      ...this.form.value,
      cliente: { id: cliente.id },
      tipo: 'COD',
      fecha: fecha.toISOString()
    };
    return entity;
  }

  onSubmit() {
    if (this.form.valid) {
      const entity = this.prepareEntity();
      const formaDePago = this.form.get('formaDePago').value;
      switch (formaDePago) {
        case 'CHEQUE': {
          this.pagoConCheque(entity);
          break;
        }
        case 'TARJETA_DEBITO':
        case 'TARJETA_CREDITO': {
          this.pagoConTarjeta(entity);
          break;
        }
        default: {
          // console.log('Salvando cobro: ', entity)
          this.save.emit(entity);
        }
      }
    }
  }

  isEditable() {
    return !this.cobro;
  }

  canDelete() {
    /*
    if (this.cobro) {
      const hoy = new Date();
      const sameDay = moment(this.cobro.fecha).isSame(hoy, 'day');
      return sameDay && this.cobro.aplicado <= 0.0;
    }
    */
    return false;
  }

  pagoConCheque(entity) {
    const ref = this.dialog.open(ChequeFormComponent, {
      data: { cobro: entity }
    });
    ref.afterClosed().subscribe(cobro => {
      if (cobro) {
        this.save.emit(cobro);
      }
    });
  }

  pagoConTarjeta(entity) {
    const ref = this.dialog.open(TarjetaFormComponent, {
      data: { cobro: entity }
    });
    ref.afterClosed().subscribe(cobro => {
      if (cobro) {
        this.save.emit(cobro);
      } else {
        console.log('Se requiere registrar datos de la tarjeta...');
      }
    });
  }
}
