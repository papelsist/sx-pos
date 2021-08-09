import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'sx-pedido-header',
  templateUrl: './pedido-header.component.html',
  styleUrls: ['./pedido-header.component.scss']
})
export class PedidoHeaderComponent implements OnInit, OnDestroy {
  @Output() addCliente = new EventEmitter();

  @Output() insertar = new EventEmitter();

  @Output() descuento = new EventEmitter();

  @Output() maniobra = new EventEmitter();

  @Output() cambiarCfdi = new EventEmitter();

  @Output() cambiarTel = new EventEmitter();

  @Input() parent: FormGroup;

  subscription: Subscription;

  @Input() editable = true;

  constructor() {}

  ngOnInit() {
    this.subscription = this.parent
      .get('cliente')
      .valueChanges // .do( cliente => console.log('Cliente seleccionado para el pedido: ', cliente))
      .subscribe(cliente => {
        if (cliente !== null) {
          this.parent.get('cfdiMail').setValue(cliente.email);
        }
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get comprador() {
    return this.parent.get('comprador').value;
  }
  get cliente() {
    return this.parent.get('cliente').value;
  }
  get kilos() {
    return _.round(this.parent.get('kilos').value, 2);
  }

  isDescuentoEspecial() {
    const tipo = this.parent.get('tipo').value;
    const fp: string = this.parent.get('formaDePago').value;
    if (tipo === 'CON' && !fp.startsWith('TAR')) {
      const descuento = this.parent.get('descuento').value;
      const descuentoOriginal = this.parent.get('descuentoOriginal').value;
      return descuento !== descuentoOriginal;
    } else {
      return false;
    }
  }

  get descuentoNormal() {
    return this.parent.get('descuento').value / 100;
  }

  get descuentoOriginal() {
    return this.parent.get('descuentoOriginal').value / 100;
  }

  toggleVentaIne() {
    const val = this.parent.get('ventaIne').value;
    this.parent.get('ventaIne').setValue(!val);
  }
}
