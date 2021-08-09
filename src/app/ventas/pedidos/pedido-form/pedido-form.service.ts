import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { PedidoDetFormComponent } from './pedido-det-form/pedido-det-form.component';
import { Sucursal, VentaDet, Cliente, Producto } from 'app/models';

import * as _ from 'lodash';
import { CONTADO, CREDITO } from 'app/ventas/models/descuentos';

import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { DescuentoEspecialComponent } from './descuento-especial/descuento-especial.component';
import { PrecioEspecialComponent } from './precio-especial/precio-especial.component';
import { Venta } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export function mapPartidaToImporte(det: VentaDet) {
  const factor = det.producto.unidad === 'MIL' ? 1000 : 1;
  const res = (det.cantidad * det.precio) / factor;
  return _.round(res, 2);
}

@Injectable()
export class PedidoFormService {
  form: FormGroup;
  pedido: Venta; // edicion de pedido existente

  constructor(public dialog: MdDialog, private service: PedidosService) {}

  registerForm(parentForm: FormGroup, pedido: Venta) {
    this.form = parentForm;
    this.pedido = pedido;
    this.form.get('cliente').valueChanges.subscribe((cliente) => {
      if (cliente && cliente.credito) {
        this.form.get('tipo').setValue('CRE');
      } else {
        this.form.get('tipo').setValue('CON');
      }
      this.cargarPreciosPorCliente(cliente);
    });
    this.cargarPreciosPorCliente(pedido.cliente);
    this.cargarDescuentosPorVolumen();
  }

  get tipo() {
    return this.form.get('tipo').value;
  }

  isCredito() {
    return this.tipo === 'CRE';
  }

  isContado() {
    return this.tipo === 'CON';
  }

  get cliente() {
    return this.form.get('cliente').value;
  }

  /**
   * Agrega una partida de pedido al
   */
  agregarPartida(config: { sucursal: Sucursal }) {
    const dialogRef = this.dialog.open(PedidoDetFormComponent, {
      data: {
        sucursal: config.sucursal,
        tipo: this.tipo,
        preciosPorCliente: this.preciosPorCliente,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.partidas.push(new FormControl(result));
        this.recalcular();
      }
    });
  }

  /**
   * Editar una partida del pedido
   */
  editarPartida(index: number, config: { sucursal: Sucursal }) {
    // const det = this.partidas.value[index];
    const control = this.partidas.at(index);
    const clone = { ...control.value };
    const dialogRef = this.dialog.open(PedidoDetFormComponent, {
      data: {
        sucursal: config.sucursal,
        tipo: this.tipo,
        partida: clone,
        preciosPorCliente: this.preciosPorCliente,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        control.patchValue(result);
        // this.partidas.removeAt(index);
        // this.partidas.insert(index, new FormControl(result));
        this.recalcular();
      }
    });
  }

  elimiarPartida(index: number) {
    this.partidas.removeAt(index);
    this.recalcular();
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  get partidasActualizables() {
    const EXCEPTIONS = ['MANIOBRA', 'MANIOBRAF'];
    return this.partidas.value.filter(
      (value) => !_.includes(EXCEPTIONS, value.producto.clave)
    );
  }

  recalcular() {
    // console.log('Recalcuando el pedido....');
    this.quitarCargosEspeciales();
    if (this.partidasActualizables.length > 0) {
      // console.log('Actualizando precios descuentos en partidas')
      this.actualizarPrecios();
      this.actualizarImportesEnPartidas();
      this.calcularDescuentos();
      this.actualizarImportesEnPartidas(); // Segunda pasada para actualizar sub total en partidas
    }
    // Cargos y maniobras por tarjeta, felte y cortes
    this.generarCargoPorCorte();
    this.generarCargosPorPagoConTarjeta();
    this.actualizarTotales();
  }

  actualizarPrecios() {
    const contado = this.form.get('tipo').value === 'CON';
    const partidas: VentaDet[] = this.partidasActualizables;
    if (partidas.length > 0) {
      // console.log('Actualizando precios....')
      partidas.forEach((item) => {
        const precio = contado
          ? item.producto.precioContado
          : item.producto.precioCredito;
        item.precio = precio;
        item.precioLista = precio;
        item.precioOriginal = item.precioLista;
        if (this.tipo === 'CRE') {
          const precioEspecial = this.buscarPrecioEspecial(item.producto);
          // console.log('Precio espeical detectado: ', precioEspecial);
          if (precioEspecial !== null) {
            item.precio = precioEspecial;
            item.precioOriginal = precioEspecial;
          }
          if (this.cliente.credito) {
            if (this.cliente.credito.postfechado) {
              item.precio = item.producto.precioContado;
            }
          }
        }
        this.actualizarPartida(item);
      });
    }
  }

  actualizarImportesEnPartidas() {
    const partidas: VentaDet[] = this.partidasActualizables;
    partidas.forEach((value) => this.actualizarPartida(value));
  }

  actualizarPartida(det: VentaDet) {
    const factor = det.producto.unidad === 'MIL' ? 1000 : 1;
    const cantidad = det.cantidad;
    const precio = det.precio;
    const descuento = det.descuento / 100;
    let importe = (cantidad * precio) / factor;
    importe = _.round(importe, 2);
    det.importe = importe;
    det.descuentoImporte = _.round(importe * descuento, 2);
    det.subtotal = det.importe - det.descuentoImporte;
    det.impuestoTasa = 0.16;
    det.impuesto = _.round(det.subtotal * det.impuestoTasa, 2);
    det.total = det.subtotal + det.impuesto;
    det.kilos = (cantidad * det.producto.kilos) / factor;
  }

  /********************* END RE INGENIERIA ************************/

  actualizarTotales() {
    const partidas: VentaDet[] = this.partidas.value;
    let importe = 0;
    let descuento = 0;
    let descuentoImporte = 0;
    let subtotal = 0;
    let impuesto = 0;
    let total = 0;
    let kilos = 0;

    partidas.forEach((row: any) => {
      // console.log('Actuaizando partida: ', row.producto.clave);
      // console.log('ROW: ', row);
      this.actualizarPartida(row);
      importe += row.importe;
      descuento = descuento < row.descuento ? row.descuento : descuento;
      descuentoImporte += row.descuentoImporte;
      subtotal += row.subtotal;
      impuesto += row.impuesto;
      total += row.total;
      kilos += row.kilos;
    });

    this.form.get('importe').setValue(importe);
    this.form.get('descuento').setValue(descuento);
    this.form.get('descuentoImporte').setValue(descuentoImporte);
    this.form.get('subtotal').setValue(subtotal);
    this.form.get('impuesto').setValue(impuesto);
    this.form.get('total').setValue(total);
    this.form.get('kilos').setValue(kilos);
  }

  calcularDescuentos() {
    const tipo = this.form.get('tipo').value;
    const fpago = this.form.get('formaDePago').value;
    if (tipo === 'CRE') {
      this.aplicarDescuentoCredito();
    } else {
      let pena = 0;
      if (fpago === 'TARJETA_CREDITO') {
        pena = 2;
      } else if (fpago === 'TARJETA_DEBITO') {
        pena = 1;
      }
      this.aplicarDescuentoContado(pena);
      this.form.get('chequePostFechado').setValue(false);
    }
  }

  aplicarDescuentoContado(pena = 0) {
    // console.log('Aplicando descuento por volumen a precios brutos con pena del: ', pena);
    const partidas: VentaDet[] = this.partidasActualizables;
    const partidasPrecioBruto = this.partidas.value.filter(
      (item) => item.producto.modoVenta === 'B'
    );
    const importes = _.map(partidasPrecioBruto, mapPartidaToImporte);
    const importeBruto = _.sum(importes);
    const descRow = this.findDescuentoPorVolumen(importeBruto);
    const descuentoOriginal = descRow ? descRow.descuento : 0;
    let descuento = descRow ? descRow.descuento : 0;

    if (descuento > pena) {
      descuento = descuento - pena;
    }
    // console.log('Aplicando descuento por volumen : ', descuento);
    _.forEach(partidas, (item) => {
      if (item.producto.modoVenta === 'B') {
        item.descuento = descuento;
        item.descuentoOriginal = descuentoOriginal;
      } else if (item.producto.modoVenta === 'N') {
        item.descuento = 0;
        item.descuentoOriginal = 0;
      }
    });
    this.form.get('descuentoOriginal').setValue(_.round(descuentoOriginal, 2));
  }

  aplicarDescuentoCredito() {
    const cliente: Cliente = this.form.get('cliente').value;
    if (cliente && cliente.credito) {
      if (!cliente.credito.postfechado) {
        this.aplicarDescuentCreditoDescuentoFijo(cliente.credito.descuentoFijo);
        this.form
          .get('descuentoOriginal')
          .setValue(cliente.credito.descuentoFijo);
        this.form.get('chequePostFechado').setValue(false);
      } else {
        this.aplicarDescuentoContado(4);
        this.form.get('chequePostFechado').setValue(true);
      }
    }
  }

  aplicarDescuentCreditoDescuentoFijo(descuento: number) {
    // console.log('Aplicando descuento en CREDITO Desc fijo de: ', descuento);
    const partidas: VentaDet[] = this.partidasActualizables;
    _.forEach(partidas, (item) => {
      item.descuento = descuento;
      item.descuentoOriginal = item.descuento;
    });
  }

  aplicarDescuentoCreditoPostfechado() {
    // console.log('Calculando descuento de credito POST FECHADO...');
    const tipo = this.form.get('tipo').value;
    const cliente: Cliente = this.form.get('cliente').value;
    if (
      tipo === 'CRE' &&
      cliente &&
      cliente.credito &&
      cliente.credito.postfechado
    ) {
      this.aplicarDescuentoContado(4);
      this.form.get('chequePostFechado').setValue(true);
    } else {
      // this.form.get('chequePostFechado').setValue(false);
    }
  }

  /*
  findDescuentoPorVolumen(importe: number) {
    // console.log('Buscando descuento por volumen para ', importe)
    let found = null;
    for (let i = 0; i < CONTADO.length; i++) {
      const item = CONTADO[i];
      if ( importe <= item.importe ) {
        found = item;
        break
      }
    }
    return  found
  }
  */

  findDescuentoPorVolumen(importe: number) {
    let found = null;
    for (let i = 0; i < this.descuentosPorVolumen.length; i++) {
      const item = this.descuentosPorVolumen[i];
      if (importe <= item.importe) {
        found = item;
        break;
      }
    }
    return found;
  }

  generarCargosPorPagoConTarjeta() {
    const fp = this.form.get('formaDePago').value;
    if (
      _.startsWith(fp, 'TARJETA') &&
      (this.tipo === 'CON' || this.tipo === 'COD')
    ) {
      console.log('Calculando cargos por pago con tarjeta de credito');
      const pena = fp === 'TARJETA_DEBITO' ? 1 : 2;
      let totalNeto = this.getImporte('N');
      console.log(' Total neto: ', totalNeto);
      // Posibles precios brutos sin descuento
      const totalBruto = this.getImporte('B');
      console.log(' .... Total bruto: ', totalBruto);
      const descuentoBruto = this.findDescuentoPorVolumen(totalBruto);

      console.log('Descuento Bruto: ', descuentoBruto);

      if (!descuentoBruto.descuento) {
        totalNeto += totalBruto;
      }
      console.log('Total para cargo: ', totalNeto);
      let importeT = totalNeto * (pena / 100);
      importeT = _.round(importeT, 2);
      console.log(' .... Total neto: ', totalNeto);
      if (totalNeto > 0) {
        console.log(`
          Generar un cargo por maniobra T por un importe de ${importeT} ( ${pena} %   de ${totalNeto} )
          en virtud de  pago con ${fp} en contado usando la clave MOANIOBRAT
          `);

        this.service.findManiobra().subscribe(
          (producto) => {
            this.form.get('comisionTarjeta').setValue(pena / 100);
            this.form.get('comisionTarjetaImporte').setValue(importeT);
            const det = this.buildPartidaDeManiobra(producto, importeT);
            console.log('Maniobra registrada: ', { ...det });
            this.partidas.push(new FormControl(det));
            this.actualizarTotales();
            // this.doAgregarPartida(det);
          },
          (err) => {
            console.log('No se encuentra el producto de maniobras');
          }
        );
      }
    }
  }

  private quitarCargosEspeciales() {
    // console.log('Quitando los cargos especiales..')
    const cargoPorTarjeta = _.findIndex(
      this.partidas.value,
      (item: VentaDet) => item.producto.clave === 'MANIOBRA'
    );
    if (cargoPorTarjeta !== -1) {
      // console.log('Qutandi cargo por tarjeta');
      this.partidas.removeAt(cargoPorTarjeta);
    }
    // console.log('Buscando partida de corte en:', this.partidas.value);
    const cargoPorCorte = _.findIndex(
      this.partidas.value,
      (item: VentaDet) => item.producto.clave === 'CORTE'
    );
    // console.log('Partida de corte: ', cargoPorCorte);
    if (cargoPorCorte !== -1) {
      // console.log('Quitando cargo por corte');
      this.partidas.removeAt(cargoPorCorte);
    }
  }

  generarCargoPorCorte() {
    const partidas = this.partidasActualizables;
    const cortes = partidas.filter((item) => item.corte);
    const importeCortes = _.sumBy(cortes, (item: VentaDet) => {
      const imp = item.corte.cantidad * item.corte.precio;
      return imp;
    });
    if (importeCortes > 0) {
      this.service.findCorte().subscribe(
        (producto) => {
          this.form.get('corteImporte').setValue(importeCortes);
          const det = this.buildPartidaDeManiobra(producto, importeCortes);

          const cargoPorCorte = _.findIndex(
            this.partidas.value,
            (item: VentaDet) => item.producto.clave === 'CORTE'
          );
          if (cargoPorCorte !== -1) {
            // console.log('Partida de corte ya registrada...', cargoPorCorte);
            this.partidas.removeAt(cargoPorCorte);
          }
          // console.log('Agregando partida de corte: ', {...det});
          // console.log('... Partidas actuales: ', this.partidas.value);
          this.partidas.push(new FormControl(det));
          this.actualizarTotales();
        },
        (err) => {
          console.log('No se encuentra el producto CORTE');
        }
      );
    }
  }

  private getImporte(tipo: 'B' | 'N') {
    const partidas: VentaDet[] = this.partidas.value;
    const partidasPrecioBruto = this.partidas.value.filter(
      (item) =>
        item.producto.modoVenta === tipo && item.producto.clave !== 'MANIOBRA'
    );
    const importes = _.map(partidasPrecioBruto, mapPartidaToImporte);
    const importeNeto = _.sum(importes);
    return importeNeto;
  }

  private buildPartidaDeManiobra(
    producto: Producto,
    importe: number
  ): VentaDet {
    return {
      producto: producto,
      cantidad: 1,
      precio: importe,
      importe: importe,
      descuentoOriginal: 0,
      descuento: 0,
      descuentoImporte: 0,
      subtotal: importe,
      impuesto: 0,
      impuestoTasa: 0.16,
      total: importe,
      precioLista: importe,
      precioOriginal: importe,
      kilos: 0,
      comentario: '',
      conVale: false,
      importeCortes: 0,
      sucursal: this.form.get('sucursal').value,
    };
  }

  aplicarDescuentoEspecial(grid: any) {
    const contado = this.isContado();
    const cliente = this.cliente;
    if (contado && this.cliente) {
      const partidas: VentaDet[] = this.partidasActualizables.filter(
        (item) => item.producto.modoVenta === 'B'
      );
      if (partidas.length > 0) {
        const descto = this.form.get('descuento').value;
        const dialogRef = this.dialog.open(DescuentoEspecialComponent, {
          data: {
            descuento: descto,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.doAplicarDescuentoEspecial(result);
            grid.refresh();
          }
        });
      }
    }
  }

  doAplicarDescuentoEspecial(descuento: number) {
    const partidas: VentaDet[] = this.partidasActualizables;
    _.forEach(partidas, (item) => {
      if (item.producto.modoVenta === 'B') {
        item.descuentoOriginal = item.descuento;
        item.descuento = descuento;
      } else if (
        item.producto.modoVenta === 'N' &&
        item.producto.clave !== 'MANIOBRA'
      ) {
        item.descuentoOriginal = 0;
        item.descuento = 0;
      }
    });
    this.actualizarTotales();
  }

  /**
   * Editar una partida del pedido
   */
  cambioDePrecio(index: number, grid) {
    const det = this.partidas.value[index];
    // console.log('Editando partida: ', det);
    const dialogRef = this.dialog.open(PrecioEspecialComponent, {
      data: {
        precio: det.precio,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.partidas.push(new FormControl(result));
        det.precio = result;
        this.recalcular();
        grid.refresh();
      }
    });
  }

  generarCargosPorFlete(grid, flete) {
    // const flete = this.form.get('cargosPorManiobra').value;
    if (flete > 0) {
      const det: VentaDet = _.find(
        this.partidas.value,
        (item: VentaDet) => item.producto.clave === 'MANIOBRAF'
      );
      const index = _.findIndex(
        this.partidas.value,
        (item: VentaDet) => item.producto.clave === 'MANIOBRAF'
      );
      //console.log('Partida de maniobra localizada: ', det);
      //console.log('Partida de maniobra localizada index: ', index);
      if (det) {
        //console.log('Actualizando importes de flete...');
        det.importe = flete;
        det.subtotal = flete;
        grid.refresh();
        this.actualizarTotales();
      } else {
        this.service.findManiobraFlete().subscribe(
          (producto) => {
            const det = this.buildPartidaDeManiobra(producto, flete);
            this.partidas.push(new FormControl(det));
            this.actualizarTotales();
          },
          (err) => {
            console.log('No se encuentra el producto de maniobras');
          }
        );
      }
    }
  }

  preciosPorCliente = [];

  cargarPreciosPorCliente(cliente: Cliente) {
    if (cliente && cliente.credito) {
      this.service.preciosPorCliente(cliente).subscribe((precios) => {
        this.preciosPorCliente = precios;
        // console.log('Precios por cliente: ', precios);
      });
    } else {
      this.preciosPorCliente = [];
    }
  }

  buscarPrecioEspecial(producto: Producto) {
    // console.log('Buscando precio especial producto: ', producto);
    const found = this.preciosPorCliente.find(
      (item) => item.clave === producto.clave
    );
    // console.log('Precio por cliente: ', found);
    if (found) {
      const precioList = producto.precioCredito;
      const descuento = 100 - found.descuento;
      const pr = _.round((precioList * descuento) / 100, 2);
      // console.log('Precio especial encongrado: ', pr);
      return pr;
    }
    return null;
  }

  descuentosPorVolumen = [];

  cargarDescuentosPorVolumen() {
    this.service
      .descuentosPorVolumen()
      // .do( res => console.log('Descuentos por volumen: ', res))
      .subscribe((res) => (this.descuentosPorVolumen = res));
  }
}
