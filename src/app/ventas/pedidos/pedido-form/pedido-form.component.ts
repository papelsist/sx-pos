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
  HostListener,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import * as _ from 'lodash';

import { Sucursal, Cliente, Venta, VentaDet } from 'app/models';
import { PedidoFormService } from './pedido-form.service';
import { PartidasGridComponent } from './partidas-grid/partidas-grid.component';
import { TdDialogService } from '@covalent/core';
import { PedidoValidator } from './pedido.validator';
import { ClienteService } from 'app/clientes/services/cliente.service';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { PendientePorClienteDialogComponent } from './pendiente-por-cliente-dialog/pendiente-por-cliente-dialog.component';
import { MdDialog } from '@angular/material';

import { pluck } from 'rxjs/operator/pluck';

@Component({
  selector: 'sx-pedido-form',
  templateUrl: './pedido-form.component.html',
  // styles: [
  //   `
  //     .table-wrapper {
  //       height: 400px;
  //       overflow: auto;
  //     }
  //   `,
  // ],
  styleUrls: ['./pedido-form.component.scss'],
})
export class PedidoFormComponent implements OnInit, OnDestroy, OnChanges {
  form: FormGroup;

  @Output() save = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Output() addNewCliente = new EventEmitter();

  @Output() cambiarCfdiMail = new EventEmitter();

  @Output() cambiarTel = new EventEmitter();

  @Output() print = new EventEmitter();

  @Input() sucursal: Sucursal;

  @Input() pedido: Venta;

  recalcular$: Observable<any>;
  recalcularSubscription: Subscription;

  formaDePago$: Observable<any>;
  formaDePagoSubscription: Subscription;
  pedidosPendientesSubs: Subscription;

  tipoSubscription: Subscription;

  editable = true;

  codSubscription: Subscription;

  cod = false;

  comentariosDeCliente: Subscription;
  comentarios: any[] = [];

  @ViewChild(PartidasGridComponent) grid: PartidasGridComponent;

  constructor(
    private fb: FormBuilder,
    private pedidoFormService: PedidoFormService,
    private cd: ChangeDetectorRef,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private clienteService: ClienteService,
    private pedidoService: PedidosService,
    private dialog: MdDialog
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pedido && changes.pedido.currentValue) {
      const pedido: Venta = changes.pedido.currentValue;
      // console.log('Editando pedido: ', pedido);
      if (pedido.id && pedido.surtido) {
        this.editable = false;
      }
      _.forEach(pedido.partidas, (item) =>
        this.partidas.push(new FormControl(item))
      );
      this.form.get('isPuesto').setValue(pedido.puesto !== undefined);

      if (pedido.envio) {
        // console.log('Pedido con envio: ', pedido.envio)
        this.form.get('mismaDireccion').setValue(false);
        this.form.get('mismaDireccion').enable();
        this.form.get('entrega').setValue('ENVIO');
      }
      this.form.patchValue(pedido, { emitEvent: false });
      this.pedidoFormService.registerForm(this.form, pedido);
      this.buildRecalcular$();
      this.buildFomraDePago$();
      if (this.form.get('tipo').value === 'CRE') {
        this.form.get('cod').setValue(false);
        this.form.get('cod').disable();
      }
      this.tipoSubscription = this.form
        .get('tipo')
        .valueChanges.subscribe((tipo) => {
          // this.pedidoFormService.recalcular();
          if (tipo === 'CRE') {
            console.log('Nuevo tipo de venta: ', tipo);
            this.form.get('cod').setValue(false);
            this.form.get('cod').disable();
          } else {
            this.form.get('cod').setValue(false);
            this.form.get('cod').enable();
          }
        });

      this.codSubscription = this.form
        .get('cod')
        .valueChanges.subscribe((cod) => {
          this.cod = cod;
        });

      // this.pedidoFormService.recalcular();
      if (pedido.id === null) {
        this.pedidosPendientesObserver();
      }
    }
  }

  ngOnInit() {
    this.comentariosDeCliente = this.form
      .get('cliente')
      .valueChanges.pluck('comentarios')
      .subscribe((coms: any[]) => {
        this.comentarios = coms.filter((item) => item.activo);
      });
  }

  ngOnDestroy() {
    this.recalcularSubscription.unsubscribe();
    this.formaDePagoSubscription.unsubscribe();
    this.tipoSubscription.unsubscribe();
    this.codSubscription.unsubscribe();
    if (this.pedidosPendientesSubs) {
      this.pedidosPendientesSubs.unsubscribe();
    }
    if (this.comentariosDeCliente) {
      this.comentariosDeCliente.unsubscribe();
    }
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
        tipo: [{ value: 'CON', disabled: true }, Validators.required],
        formaDePago: ['EFECTIVO', Validators.required],
        atencion: ['', Validators.required],
        entrega: ['LOCAL', Validators.required],
        vale: [{ value: false, disabled: true }, Validators.required],
        clasificacionVale: [
          { value: 'SIN_VALE', disabled: false },
          Validators.required,
        ],
        sucursalVale: [{ value: null, disabled: false }],
        almacen: [{ value: null, disabled: true }],
        mismaDireccion: [{ value: true, disabled: true }, Validators.required],
        entregaParcial: [{ value: false, disabled: true }, Validators.required],
        direccion: [null],
        comprador: [null],
        comentario: [null],
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
        createUser: [null],
        socio: [null],
        chequePostFechado: [false],
        ventaIne: [false],
      },
      { validator: PedidoValidator }
    );
  }

  private buildRecalcular$() {
    console.log('Preparando recalculo observable');
    const cliente$ = this.form
      .get('cliente')
      .valueChanges.distinctUntilChanged();
    const tipo$ = this.form.get('tipo').valueChanges.distinctUntilChanged();
    const formaDePago$ = this.form
      .get('formaDePago')
      .valueChanges.distinctUntilChanged();
    this.recalcular$ = Observable.merge(cliente$, tipo$, formaDePago$);

    this.recalcularSubscription = this.recalcular$.subscribe((data) => {
      console.log('Recalculando importes : ', data);
      this.pedidoFormService.recalcular();
      this.cd.detectChanges();
      this.grid.refresh();
    });
  }

  private buildFomraDePago$() {
    console.log('Cambiando forma de pago');
    const cliente$ = this.form.get('cliente').valueChanges; // .filter( cliente =>  cliente !== null);

    const tipo$ = this.form.get('tipo').valueChanges.distinctUntilChanged();

    this.formaDePago$ = Observable.combineLatest(cliente$, tipo$);

    this.formaDePagoSubscription = this.formaDePago$.subscribe((value) => {
      const cliente = value[0];
      const tipo = value[1];
      if (tipo === 'CRE') {
        this.form.get('formaDePago').disable();
        this.form.get('formaDePago').setValue('CHEQUE');
      }
      if (tipo === 'CON') {
        this.form.get('formaDePago').enable();
        this.form.get('formaDePago').setValue('EFECTIVO');
      }
    });
  }

  onAddNewCliente() {
    this.addNewCliente.emit();
  }

  onInsertPartida() {
    if (this.editable) {
      this.pedidoFormService.agregarPartida({ sucursal: this.sucursal });
    }
  }

  onEditPartida(index: number) {
    this.pedidoFormService.editarPartida(index, { sucursal: this.sucursal });
  }

  onDelete(index: number) {
    this.pedidoFormService.elimiarPartida(index);
  }

  onCambioDePrecio(index: number) {
    this.pedidoFormService.cambioDePrecio(index, this.grid);
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
      /** Se desactiva la validacion de Cfdi clientes */

      // if (this.cliente.cfdiValidado) {
      const pedido: Venta = {
        ...this.form.getRawValue(),
        sucursal: this.sucursal,
        vendedor: this.cliente.vendedor,
      };
      this.fixPedidoToApi(pedido);
      _.forEach(pedido.partidas, (item) => (item.sucursal = this.sucursal));
      this.save.emit(pedido);
      /*  } else {
        this.validarCfdi();
      }*/
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
    _.forEach(data, (item) => (item.producto = item.producto.id));

    pedido.updateUser = this.form.get('usuario').value.username;
    if (!this.id) {
      pedido.createUser = this.form.get('usuario').value.username;
    }
    if (!this.id) {
      pedido.fecha = new Date().toISOString();
    } else {
      pedido.fecha = this.pedido.fecha;
      // delete pedido.lastUdated;
      // delete pedido.dateCreated;
    }
    return pedido;
  }

  validarCfdi() {
    if (!this.cliente.cfdiValidado) {
      this._dialogService
        .openPrompt({
          message: 'Email para CFDI',
          title: 'Confirmar correo para envío de CFDIs',
          value: this.cliente.cfdiMail,
          acceptButton: 'Aceptar',
          cancelButton: 'Cancelar',
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.clienteService
              .confirmarCorreo(
                this.cliente.id,
                res,
                this.form.get('usuario').value.username
              )
              .subscribe((cliente) => {
                this.form.get('cliente').setValue(cliente);
                this._dialogService.openAlert({
                  title: 'Actualización de correos',
                  message:
                    'Email para CFDI del cliente actualizado y/o confirmado',
                  closeButton: 'Continuar',
                });
              });
          } else {
            this.cliente.cfdiValidado = true;
          }
        });
    }
  }

  /*
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Event: ', event.key);
  }
  */

  onDescuento() {
    this.pedidoFormService.aplicarDescuentoEspecial(this.grid);
    // this.cd.detectChanges();
    // this.grid.refresh();
  }

  onPuesto(puesto) {
    if (puesto.checked) {
      this.form.get('puesto').setValue(new Date().toISOString());
    } else {
      this.form.get('puesto').setValue(null);
    }
  }

  onCambioDeCfdi(cliente) {
    // console.log('Cambio de CFDI mail', cliente);

    if (this.usuario) {
      this.cambiarCfdiMail.emit({ cliente: cliente, usuario: this.usuario });
    }
  }

  onCambioDeTel(cliente) {
    if (this.usuario) {
      this.cambiarTel.emit({ cliente: cliente, usuario: this.usuario });
    }
  }

  onManiobra() {
    this._dialogService
      .openPrompt({
        message: 'Importe del cargo',
        viewContainerRef: this._viewContainerRef,
        title: 'Maniobras',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      })
      .afterClosed()
      .subscribe((newValue: string) => {
        if (newValue) {
          const importe = _.toNumber(newValue);
          if (!_.isNaN(importe) && _.isNumber(importe)) {
            // console.log('Asignando flete: ', importe);
            this.form.get('cargosPorManiobra').setValue(importe);
            this.pedidoFormService.generarCargosPorFlete(this.grid, importe);
          }
        }
      });
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
        this.onCambioDeCfdi(this.cliente);
      }
    }
  }

  setUsuario(usuario) {
    this.form.get('usuario').setValue(usuario);
  }

  get usuario() {
    return this.form.get('usuario').value;
  }

  pedidosPendientesObserver() {
    this.pedidosPendientesSubs = this.form
      .get('cliente')
      .valueChanges.distinctUntilChanged()
      .subscribe((cliente) => {
        this.pedidoService
          .buscarPedidosPendientes(cliente)
          .catch((err) => {
            console.log('Error: ', err);
            return Observable.of([]);
          })
          .subscribe((pendientes: any[]) => {
            if (pendientes.length > 0) {
              this.showPedidosPendientes(pendientes);
            }
          });
      });
  }

  showPedidosPendientes(pedidos) {
    console.log('PEdidos pendientes: ', pedidos);
    this.dialog
      .open(PendientePorClienteDialogComponent, {
        data: { pedidos: pedidos, cliente: this.cliente.nombre },
      })
      .afterClosed()
      .subscribe();
  }
}
