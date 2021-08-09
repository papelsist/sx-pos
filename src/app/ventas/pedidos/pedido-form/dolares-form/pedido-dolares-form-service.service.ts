import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { PedidoDetFormComponent } from '../pedido-det-form/pedido-det-form.component';
import { Sucursal, VentaDet} from 'app/models';

import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';

export function mapPartidaToImporte( det: VentaDet) {
  const factor = det.producto.unidad === 'MIL' ? 1000 : 1;
  const res =  (det.cantidad * det.precio) / factor
  return _.round(res, 2);
}

@Injectable()
export class PedidoDolaresFormServiceService {

  form: FormGroup;

  constructor(
    public dialog: MdDialog,
    private service: PedidosService
  ) { }

  registerForm(parentForm: FormGroup) {
    this.form = parentForm;
  }

  get tipo() {
    return this.form.get('tipo').value;
  }

  isCredito() {
    return this.tipo === 'CRE';
  }

  /**
   * Agrega una partida de pedido al
   */
  agregarPartida(config: {sucursal: Sucursal}) {
    const dialogRef = this.dialog.open(PedidoDetFormComponent, {
      data: {
        sucursal: config.sucursal,
        tipo: this.tipo,
        dolares: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.partidas.push(new FormControl(result));
        this.recalcular();
      }
    });
  }

  /**
   * Editar una partida del pedido
   */
  editarPartida(index: number, config: {sucursal: Sucursal}) {
    const det = this.partidas.value[index];
    // console.log('Editando partida: ', det);
    const dialogRef = this.dialog.open(PedidoDetFormComponent, {
      data: {
        sucursal: config.sucursal,
        tipo: this.tipo,
        partida: det
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.partidas.push(new FormControl(result));
        this.recalcular();
      }
    });

  }

  elimiarPartida( index: number) {
    this.partidas.removeAt(index);
    this.recalcular();
  }


  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  get partidasActualizables() {
    const EXCEPTIONS = ['MANIOBRA'];
    return this.partidas.value.filter(value => !_.includes(EXCEPTIONS, value.producto.clave ));
  }

  recalcular() {
    console.log('Recalcuando el pedido....');
    this.actualizarImportesEnPartidas();
    this.actualizarTotales();
  }

  actualizarImportesEnPartidas() {
    const partidas: VentaDet[] = this.partidasActualizables;
    partidas.forEach(value => this.actualizarPartida(value));
  }

  actualizarPartida(det: VentaDet) {

    const factor = det.producto.unidad === 'MIL' ? 1000 : 1;
    const cantidad = det.cantidad;
    const precio = det.precio;
    let importe = (cantidad * precio) / factor;
    importe = _.round(importe, 2);
    det.importe = importe;
    det.descuentoImporte = _.round( (importe * det.descuento) , 2);
    det.subtotal = det.importe - det.descuentoImporte
    det.impuestoTasa = 0.16;
    det.impuesto = _.round(det.subtotal * det.impuestoTasa , 2);
    det.total = det.subtotal + det.impuesto;
    det.kilos = (cantidad * det.producto.kilos) / factor;
   

  }
  
  actualizarTotales() {
    const partidas: VentaDet[] = this.partidas.value;
    let importe = 0;
    let descuento = 0;
    let descuentoImporte = 0;
    let subtotal = 0;
    let impuesto = 0;
    let total = 0;
    let kilos = 0;

    partidas.forEach(row => {
      
      this.actualizarPartida(row);
      importe += row.importe;
      descuento = descuento < row.descuento ? row.descuento : descuento;
      descuentoImporte += row.descuentoImporte;
      subtotal += row.subtotal;
      impuesto += row.impuesto;
      total += row.total;
      kilos += row.kilos

    });

    this.form.get('importe').setValue(importe);
    this.form.get('descuento').setValue(descuento);
    this.form.get('descuentoImporte').setValue(descuentoImporte);
    this.form.get('subtotal').setValue(subtotal);
    this.form.get('impuesto').setValue(impuesto);
    this.form.get('total').setValue(total);
    this.form.get('kilos').setValue(kilos);
  }

}

