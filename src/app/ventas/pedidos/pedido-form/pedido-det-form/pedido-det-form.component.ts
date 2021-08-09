import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import * as _ from 'lodash';

import { Existencia, Producto, Sucursal, VentaDet, Cliente } from 'app/models';
import { ExistenciasService } from 'app/ventas/services/existencias.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { PedidodetValidator } from './pedidodet.validator';

export function onlyNumber(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = _.toNumber(control.value);
    const ok = _.isFinite(value);
    return ok ? null : { notNumber: { value: value } };
  };
}

@Component({
  selector: 'sx-pedidodet-form-partida',
  templateUrl: 'pedido-det-form.component.html',
  styleUrls: ['./pedido-det-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PedidoDetFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sucursal: Sucursal;
  producto$: Observable<Producto>;
  disponibilidadTotal$: Observable<number>;
  disponibilidadTotal = 0;

  existenciaRemota$: Observable<Existencia[]>;
  existencias: Existencia[] = [];

  sinExistencia$: Observable<boolean>;
  // conVale$: Observable<boolean>;
  tipoDePrecio = 'CON';
  importeBruto$: Observable<number>;

  partida: VentaDet;
  dolares = false;

  subs1: Subscription;
  subs2: Subscription;
  existenciaRemotaSubs: Subscription;
  // subs4: Subscription;

  corte$: Observable<boolean>;
  corteSubscription: Subscription;

  preciosPorCliente = [];

  constructor(
    public dialogRef: MdDialogRef<PedidoDetFormComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private existenciasService: ExistenciasService
  ) {
    this.sucursal = data.sucursal;
    this.tipoDePrecio = data.tipo;
    this.partida = data.partida;
    this.dolares = data.dolares || false;
    this.preciosPorCliente = data.preciosPorCliente;
  }

  ngOnInit() {
    this.buildForm();
    this.edicion();
    this.buildExistenciaRemota$();
    this.buildProducto$();
    this.buildCorte$();
  }

  private edicion() {
    if (this.partida) {
      // console.log('Editando la partida.....', this.partida);
      this.form.patchValue(this.partida);
      if (this.partida.corte) {
        // Actualizando informacion de corte
        this.form.get('cortado').enable();
        this.form.get('cortado').setValue(true);
      }
      this.buildExistencias();
    }
  }

  private buildForm() {
    this.form = this.fb.group(
      {
        existencia: [null],
        producto: [null, Validators.required],
        cantidad: [0.0, [Validators.required, Validators.min(1)]],
        precio: [
          { value: 0, disabled: !this.asignarPrecio() },
          [Validators.required, , Validators.min(1)]
        ],
        importe: [{ value: 0, disabled: true }],
        importeConIva: [{ value: 0, disabled: true }],
        cortado: [{ value: false, disabled: false }],
        sinExistencia: [{ value: false, disabled: false }],
        conVale: [{ value: false, disabled: false }],
        conTrs: [{ value: false, disabled: false }],
        corte: this.fb.group({
          cantidad: [0, Validators.required],
          tipo: [''],
          precio: [0, Validators.required],
          instruccion: [null]
        })
      },
      { validator: PedidodetValidator }
    );
  }

  private buildExistenciaRemota$() {
    this.existenciaRemota$ = this.form
      .get('producto')
      .valueChanges.filter(producto => producto !== null)
      .distinctUntilChanged()
      .do(producto => {
        if (!this.asignarPrecio()) {
          this.form
            .get('precio')
            .setValue(
              this.tipoDePrecio === 'CON'
                ? producto.precioContado
                : producto.precioCredito
            );
          const pe = this.buscarPrecioEspecial(producto);
          if (pe) {
            this.form.get('precio').setValue(pe);
          }
        }
      })
      .switchMap(producto => {
        return this.existenciasService.buscarExistencias(producto);
      });
    this.existenciaRemotaSubs = this.existenciaRemota$.subscribe(exis => {
      this.existencias = exis;
      console.log('Exis: ', exis);
      // Fijar la existencia local
      const found = _.find(
        this.existencias,
        item => item.sucursal.id === this.sucursal.id
      );
      console.log('Existencia LOCAL: ', found);
      this.form.get('existencia').setValue(found);
      this.disponibilidadTotal = _.sumBy(this.existencias, 'disponible');
    });
  }

  buildExistencias() {
    const producto = this.form.get('producto').value;
    if (producto) {
      this.existenciasService.buscarExistencias(producto).subscribe(exis => {
        this.existencias = exis;
        // Fijar la existencia local
        const found = _.find(
          this.existencias,
          item => item.sucursal.id === this.sucursal.id
        );
        this.form.get('existencia').setValue(found);
        // Calcular la existencia total
        this.disponibilidadTotal = _.sumBy(this.existencias, 'disponible');
      });
    }
  }

  getExistenciaLocal(): Existencia {
    if (this.existencias) {
      return _.find(
        this.existencias,
        item => item.sucursal.id === this.sucursal.id
      );
    }
    return null;
  }

  private buildProducto$() {
    this.producto$ = this.form.get('producto').valueChanges;
    this.subs1 = this.producto$.subscribe(p => {
      if (p !== null) {
        if (p.presentacion === 'EXTENDIDO') {
          this.form.get('cortado').enable();
        } else {
          this.form.get('cortado').disable();
        }
      }
    });
  }

  private buildSinExistencia() {
    this.sinExistencia$ = this.form
      .get('existencia')
      .valueChanges.combineLatest(
        this.form.get('cantidad').valueChanges,
        (exis, cantidad) => {
          return exis.disponible - cantidad < 0;
        }
      );
    this.subs2 = this.sinExistencia$.subscribe(val => {
      if (val) {
        this.form.get('sinExistencia').enable();
      } else {
        this.form.get('sinExistencia').disable();
      }
    });
  }

  private buildCorte$() {
    this.corte$ = this.form.get('cortado').valueChanges;
    this.corteSubscription = this.corte$.subscribe(val => {
      if (!val) {
        const instruccion = this.form.get('corte').value;
        instruccion.cantidad = 0;
        instruccion.precio = 0;
        instruccion.instruccion = null;
      }
    });
  }

  ngOnDestroy() {
    this.subs1.unsubscribe();
    this.corteSubscription.unsubscribe();
    if (this.subs2) {
      this.subs2.unsubscribe();
    }
    if (this.existenciaRemotaSubs) {
      this.existenciaRemotaSubs.unsubscribe();
    }
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const ventaDet = this.preparePartida();
    this.dialogRef.close(ventaDet);
  }

  preparePartida(): VentaDet {
    const rawData = this.form.getRawValue();
    const producto = rawData.producto;
    const factor = producto.unidad === 'MIL' ? 1000 : 1;
    const kilos = rawData.cantidad * producto.kilos / factor;
    const det: VentaDet = {
      producto: producto,
      cantidad: _.toNumber(rawData.cantidad),
      precio: rawData.precio,
      importe: rawData.importe,
      descuentoOriginal: 0,
      descuento: 0,
      descuentoImporte: 0,
      subtotal: rawData.importe,
      impuesto: 0,
      impuestoTasa: 0.16,
      total: rawData.importe,
      precioLista:
        this.tipoDePrecio === 'CON'
          ? producto.precioContado
          : producto.precioCredito,
      precioOriginal:
        this.tipoDePrecio === 'CON'
          ? producto.precioContado
          : producto.precioCredito,
      kilos: kilos,
      comentario: rawData.comentario,
      conVale: rawData.conVale,
      importeCortes: rawData.importeCortes,
      sucursal: this.sucursal,
      sinExistencia: rawData.sinExistencia
    };
    if (this.form.get('cortado').value) {
      const corte = { ...this.form.get('corte').value };
      if (corte.ventaDet) {
        corte.ventaDet = { id: corte.ventaDet.id };
      }
      // corte.ventaDet = { id: corte.ventaDet.id };
      det.corte = corte;
      det.importeCortes = det.corte.cantidad * det.corte.precio;
    }
    return det;
  }

  get existencia() {
    return this.form.get('existencia').value;
  }

  asignarPrecio() {
    return this.dolares;
  }

  get producto() {
    return this.form.get('producto').value;
  }

  get importeConIva() {
    return _.round(this.importeBruto * 1.16);
  }
  get importeBruto() {
    const importeBruto = this.cantidad * this.precio / this.factor;
    return _.round(importeBruto, 2);
  }

  get factor() {
    if (this.producto) {
      return this.producto.unidad === 'MIL' ? 1000 : 1;
    } else {
      return 1;
    }
  }

  get cantidad(): number {
    return this.form.get('cantidad').value;
  }

  get precio(): number {
    return this.form.get('precio').value;
  }

  buscarPrecioEspecial(producto: Producto) {
    // console.log('Buscando precio especial producto: ', producto);
    const found = this.preciosPorCliente.find(
      item => item.clave === producto.clave
    );
    // console.log('Precio por cliente: ', found);
    if (found) {
      const precioList = producto.precioCredito;
      const descuento = 100 - found.descuento;
      const pr = _.round(precioList * descuento / 100, 2);
      // console.log('Precio especial encongrado: ', pr);
      return pr;
    }
    return null;
  }
  /*
  buscarPrecioEspecial(producto: Producto){
    if(this.cliente && this.cliente.credito) {

      this.service.buscarPreciosPorCliente(this.cliente, producto).subscribe( res => {
        console.log('Precio encontrado: ', res);
        const precioList = this.producto.precioCredito;
        const descuento = 100 - res.descuento;
        const pr = _.round(  (precioList * descuento) /100 , 2)

        this.form.get('precio').setValue(pr);
      });
    }
  }
  */
}
