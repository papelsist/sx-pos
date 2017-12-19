import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy,
  SimpleChanges, ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';


import { Venta } from 'app/models';
import { Cobro } from 'app/models/cobro';

import { ChequeFormComponent } from 'app/caja/facturacion/cobro/cheque-form/cheque-form.component';


export const CobradoValidator = (control: AbstractControl): {[key: string]: boolean} => {
  const cobrado = control.value;
  return cobrado > 0 ? null : { importeInvalido: true };
};


@Component({
  selector: 'sx-cobro-cod-form',
  templateUrl: './cobro-cod-form.component.html',
  styleUrls: ['./cobro-cod-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CobroCodFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() venta: Venta;

  @Output() save = new EventEmitter();

  @Output() cancelar = new EventEmitter();

  formasDePago = ['EFECTIVO'];

  parciales: Cobro[] = [];

  subscription: Subscription;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.venta && changes.venta.currentValue !== null ) {
      this.form.patchValue({
        formaDePago: this.venta.formaDePago,
        importe: this.venta.total
      });
    }
  }

  ngOnInit() {
    // console.log('Cobro de venta: ', this.venta);
    if (this.venta.cliente.permiteCheque || this.venta.formaDePago === 'CHEQUE') {
      this.formasDePago.push('CHEQUE');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  private buildForm() {
    this.form = this.fb.group({
      importe: [0, [Validators.required]],
      formaDePago: [null, [Validators.required, this.validarFormaDePago.bind(this)]],
      cambio: [{value: 0, disabled: true}],
    }, {
      validator: this.validarPorCobrar.bind(this)
    });

    this.subscription = this.form.get('importe').valueChanges.subscribe(importe => {
      if (this.porCobrar < 0) {
        let cambio = Math.abs(this.porCobrar);
        cambio = _.round(cambio,2);
        this.form.get('cambio').setValue(cambio);
      } else {
        this.form.get('cambio').setValue(0);
      }
    });
  }

  validarPorCobrar(control: AbstractControl) {
    if (this.venta) {
      const pendiente = this.porCobrar
      return pendiente <= 0 ? null : {importeInvalido: true};
    }
    return null;
  }

  validarFormaDePago(control: AbstractControl) {
    const fp = control.value;
    if (fp === 'CHEQUE') {
      const cliente = this.venta.cliente;
      const result = cliente.permiteCheque ? null : {permiteCheque: false};
      return cliente.permiteCheque ? null : {permiteCheque: false};
    }
    return null;
  }

  get saldo() {
    return this.venta.total;
  }

  get totalParciales() {
    return _.sumBy(this.parciales, item => {
      return item.id ? item.porAplicar : item.disponible
    });
  }

  get importe() {
    return this.form.get('importe').value;
  }

  get porCobrar() {
    return this.saldo - this.totalParciales - this.importe
  }

  get pendiente() {
    return this.saldo - this.totalParciales
  }

  get permitirMasCobros() {
    return this.porCobrar > 0 && this.importe > 0 
  }

  agregarCobro() {
    const cobro = this.prepareEntity();
    let cobro$: Observable<any> = null;
    if (cobro.formaDePago === 'CHEQUE') {
      cobro$ = this.agregarCheque(cobro);
    }
    if (cobro$) {
      cobro$.subscribe(res => {
        if (res) {
          this.pushCobro(res);
        }
      });
    } else {
      this.pushCobro(cobro);
    }
  }

  pushCobro(cobro: Cobro) {
    this.parciales.push(cobro);
    this.form.reset({
      importe: 0,
      formaDePago: this.venta.formaDePago,
      cambio: 0
    });
  }

  quitarCobro(index: number) {
    this.parciales.splice(index);
  }

  private prepareEntity() {
    const value = _.toNumber(this.form.get('importe').value)
    const cobro: Cobro = {
      cliente: this.venta.cliente,
      sucursal: this.venta.sucursal,
      tipo: this.venta.tipo,
      fecha: new Date().toISOString(),
      formaDePago: this.form.get('formaDePago').value,
      moneda: this.venta.moneda,
      tipoDeCambio: this.venta.tipoDeCambio,
      importe: value,
      disponible: value
    }
    console.log('Agregar datos de la forma de pago...');
    return cobro;
  }

  onSubmit() {
    if (this.form.valid) {
      const cobros = [... this.parciales];
      const last = this.prepareEntity();
      let cobro$: Observable<any> = null;
      if (last.formaDePago === 'CHEQUE') {
        cobro$ = this.agregarCheque(last);
      } if (cobro$) {
        cobro$.subscribe( result => {
          if (result) {
            cobros.push(result);
            const cobroJob = {
              venta: this.venta,
              cobros: cobros
            }
            this.doSave(cobroJob);
          }
        });
      } else {
        cobros.push(this.prepareEntity());
        const cobroJob = {
          venta: this.venta,
          cobros: cobros
        }
        this.doSave(cobroJob);
      }
    }
  }

  /**
   * Fix requerido para pasar solo id's al API y evitar actualizaciones inecesarias
   * 
   * @param cobroJob 
   */
  doSave(cobroJob: any) {
    const cobros = cobroJob.cobros;
    _.forEach(cobros, (item: any) => {
      item.cliente = item.cliente.id
    });
    const result = {
      venta: {id: cobroJob.venta.id},
      cobros: cobros
    }
    this.save.emit(result);
  }
  

  agregarCheque(cobro: Cobro): Observable<any> {
    const dialogRef = this.dialog.open(ChequeFormComponent, {
      data: {cobro: cobro}
    });
    return dialogRef.afterClosed();
  }
  

  saldar() {
    this.form.get('importe').setValue(_.round(this.pendiente, 2));
  }

  getItemIcon(item) {
    switch (item.formaDePago) {
      case 'TARJETA_CREDITO':
      case 'TARJETA_DEBITO': {
        return 'credit_card';
      }
      case 'EFECTIVO':
        return 'attach_money'
      default:
        return 'local_atm'
    }
  }

}