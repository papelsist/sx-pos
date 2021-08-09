import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChanges,
  ViewChild,
  HostListener
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import * as _ from 'lodash';

import { Sucursal, Venta } from 'app/models';

import { PartidasGridComponent } from '../partidas-grid/partidas-grid.component';
import { PedidoDolaresFormServiceService } from './pedido-dolares-form-service.service';
import { PedidoValidator } from '../pedido.validator';

@Component({
  selector: 'sx-dolares-form',
  templateUrl: './dolares-form.component.html',
  styleUrls: ['./dolares-form.component.scss']
})
export class DolaresFormComponent implements OnInit, OnDestroy, OnChanges {
  form: FormGroup;

  @Output() save = new EventEmitter();

  @Output() addNewCliente = new EventEmitter();

  @Input() sucursal: Sucursal;

  @Input() pedido: Venta;

  recalcular$: Observable<any>;
  recalcularSubscription: Subscription;

  formaDePago$: Observable<any>;
  formaDePagoSubscription: Subscription;

  @ViewChild(PartidasGridComponent) grid: PartidasGridComponent;

  constructor(
    private fb: FormBuilder,
    private service: PedidoDolaresFormServiceService,
    private cd: ChangeDetectorRef
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pedido && changes.pedido.currentValue) {
      const pedido: Venta = changes.pedido.currentValue;
      _.forEach(pedido.partidas, item =>
        this.partidas.push(new FormControl(item))
      );
      this.form.patchValue(pedido, { emitEvent: false });
      this.service.registerForm(this.form);
      this.buildRecalcular$();
      this.buildFomraDePago$();
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.recalcularSubscription.unsubscribe();
    this.formaDePagoSubscription.unsubscribe();
  }

  private buildForm() {
    this.form = this.fb.group(
      {
        id: [null],
        documento: [0],
        sucursal: [this.sucursal],
        fecha: [{ value: new Date(), disabled: true }, Validators.required],
        cliente: [null, Validators.required],
        nombre: [null],
        tipo: [{ value: 'CRE', disabled: false }, Validators.required],
        formaDePago: ['CHEQUE', Validators.required],
        atencion: ['', Validators.required],
        entrega: ['LOCAL', Validators.required],
        vale: [{ value: false, disabled: true }, Validators.required],
        clasificacionVale: [
          { value: 'SIN_VALE', disabled: false },
          Validators.required
        ],
        sucursalVale: [{ value: null, disabled: false }],
        almacen: [{ value: null, disabled: true }],
        mismaDireccion: [{ value: true, disabled: true }, Validators.required],
        entregaParcial: [{ value: false, disabled: true }, Validators.required],
        direccion: [null],
        comprador: [null],
        comentario: [null],
        tipoDeCambio: [{ value: 1 }, [Validators.required, Validators.min(2)]],
        importe: [{ value: 0, disabled: true }],
        descuento: [{ value: 0, disabled: true }],
        descuentoImporte: [{ value: 0, disabled: true }],
        descuentoOriginal: [{ value: 0, disabled: true }],
        subtotal: [{ value: 0, disabled: true }],
        impuesto: [{ value: 0, disabled: true }],
        total: [{ value: 0, disabled: true }],
        partidas: this.fb.array([]),
        cod: [false],
        cargosPorManiobra: [{ value: 0, disabled: true }],
        comisionTarjeta: [{ value: 0, disabled: true }],
        comisionTarjetaImporte: [{ value: 0, disabled: true }],
        corteImporte: [{ value: 0, disabled: true }],
        cfdiMail: [{ value: null, disabled: true }],
        usoDeCfdi: ['', Validators.required],
        kilos: [{ value: 0, disabled: true }],
        envio: null,
        isPuesto: false,
        puesto: null,
        usuario: [null, Validators.required],
        socio: [null],
        moneda: ['USD'],
        ventaIne: [false]
      },
      { validator: PedidoValidator }
    );
  }

  private buildForm2() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [this.sucursal],
      fecha: [{ value: new Date(), disabled: true }, Validators.required],
      cliente: [null, Validators.required],
      tipo: [{ value: 'CON', disabled: false }, Validators.required],
      atencion: ['MOSTRADOR', Validators.required],
      entrega: ['LOCAL', Validators.required],
      vale: [false, Validators.required],
      formaDePago: ['EFECTIVO', Validators.required],
      sucursalVale: [null],
      almacen: [null],
      mismaDireccion: [{ value: true, disabled: true }, Validators.required],
      direccion: [null],
      comprador: [null],
      comentario: [null],
      tipoDeCambio: [{ value: 1 }, [Validators.required, Validators.min(2)]],
      importe: [{ value: 0, disabled: true }],
      descuento: [{ value: 0, disabled: true }],
      descuentoImporte: [{ value: 0, disabled: true }],
      descuentoOriginal: [{ value: 0, disabled: true }],
      subTotal: [{ value: 0, disabled: true }],
      impuesto: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
      partidas: this.fb.array([]),
      cod: [false],
      cargosPorManiobra: [{ value: 0, disabled: true }],
      comisionTarjeta: [{ value: 0, disabled: true }],
      comisionTarjetaImporte: [{ value: 0, disabled: true }],
      corteImporte: [{ value: 0, disabled: true }],
      moneda: ['USD']
    });
  }

  private buildRecalcular$() {
    // console.log('Preparando recalculo observable');

    const cliente$ = this.form
      .get('cliente')
      .valueChanges.filter(c => c !== null)
      .distinctUntilChanged();
    const tipo$ = this.form.get('tipo').valueChanges.distinctUntilChanged();
    const formaDePago$ = this.form
      .get('formaDePago')
      .valueChanges.distinctUntilChanged();

    this.recalcular$ = Observable.combineLatest(cliente$, tipo$, formaDePago$);

    this.recalcularSubscription = this.recalcular$.subscribe(data => {
      // console.log('CombineLatest res : ', data);
      this.service.recalcular();
      this.cd.detectChanges();
      this.grid.refresh();
    });
  }

  private buildFomraDePago$() {
    const tipo$ = this.form.get('tipo').valueChanges.distinctUntilChanged();
    this.formaDePagoSubscription = tipo$.subscribe(tipo => {
      if (tipo === 'CRE') {
        // this.form.get('formaDePago').disable();
        // this.form.get('formaDePago').setValue('CHEQUE');
      }
      if (tipo === 'CON') {
        // this.form.get('formaDePago').enable();
        // this.form.get('formaDePago').setValue('EFECTIVO');
      }
    });
  }

  onAddNewCliente() {
    // this.addNewCliente.emit();
  }

  onInsertPartida() {
    this.service.agregarPartida({ sucursal: this.sucursal });
  }

  onEditPartida(index: number) {
    this.service.editarPartida(index, { sucursal: this.sucursal });
  }

  onDelete(index: number) {
    this.service.elimiarPartida(index);
  }

  get cliente() {
    return this.form.get('cliente').value;
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }
  get fecha() {
    return this.form.get('fecha').value;
  }

  get id() {
    return this.form.get('id').value;
  }

  onSave() {
    if (this.form.valid) {
      const pedido: Venta = {
        ...this.form.getRawValue(),
        sucursal: this.sucursal,
        vendedor: this.cliente.vendedor
      };
      this.fixPedidoToApi(pedido);

      _.forEach(pedido.partidas, item => (item.sucursal = this.sucursal));
      this.save.emit(pedido);
    }
  }

  /**
   * Ajuste requerido para que Grails genere un update inecesario al producto. Cuando Grails recibe en
   * el payload de un HttpRequest mas propiedades aparte del ID genera un update a estas. Lo que ocaciona que
   * se registre un cambio inecesario en cada producto y en el cliente
   * @param pedido
   * @returns {any[]}
   */
  private fixPedidoToApi(pedido) {
    pedido.cliente = pedido.cliente.id;
    const data = [...pedido.partidas];
    _.forEach(data, item => {
      item.producto = item.producto.id;
      item.precio = _.toNumber(item.precio);
    });

    pedido.updateUser = this.form.get('usuario').value.username;
    if (!this.id) {
      pedido.createUser = this.form.get('usuario').value.username;
    }
    pedido.tipoDeCambio = _.toNumber(this.form.get('tipoDeCambio').value);

    return pedido;
  }

  onSave2() {
    if (this.form.valid) {
      const pedido: Venta = {
        ...this.form.getRawValue(),
        sucursal: this.sucursal,
        vendedor: this.cliente.vendedor
      };
      _.forEach(pedido.partidas, item => (item.sucursal = this.sucursal));
      this.save.emit(pedido);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.ctrlKey && event.code === 'KeyI') {
      this.onInsertPartida();
    }
    if (event.code === 'Insert') {
      this.onInsertPartida();
    }
    if (event.code === 'F7') {
      this.onAddNewCliente();
    }
    if (event.code === 'F10') {
      console.log('Salvando con tecla F10');
      this.onSave();
    }
    if (event.code === 'F8') {
      if (this.cliente) {
        // this.onCambioDeCfdi(this.cliente);
      }
    }
  }

  setUsuario(usuario) {
    this.form.get('usuario').setValue(usuario);
  }

  get usuario() {
    return this.form.get('usuario').value;
  }
}
