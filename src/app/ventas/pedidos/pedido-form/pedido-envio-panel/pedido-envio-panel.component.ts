import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';
import { EnvioDireccionComponent } from '@siipapx/ventas/pedidos/pedido-form/envio-direccion/envio-direccion.component';

@Component({
  selector: 'sx-pedido-envio-panel',
  templateUrl: './pedido-envio-panel.component.html',
  styleUrls: ['./pedido-envio-panel.component.css']
})
export class PedidoEnvioPanelComponent implements OnInit, OnDestroy {
  @Input() parent: FormGroup;

  subscription: Subscription;
  subscription2: Subscription;

  constructor(public dialog: MdDialog) {}

  get envio() {
    return this.parent.get('envio').value;
  }

  ngOnInit() {
    this.subscription = this.parent
      .get('entrega')
      .valueChanges.subscribe(entrega => {
        if (entrega !== 'LOCAL') {
          this.parent.get('mismaDireccion').enable();
          this.parent.get('mismaDireccion').setValue(true);
        } else {
          this.parent.get('mismaDireccion').disable();
          this.parent.get('envio').setValue(null);
        }
      });

    this.subscription2 = this.parent
      .get('mismaDireccion')
      .valueChanges.subscribe(value => {
        const socio = this.parent.get('socio').value;

        if (value === false && socio === null) {
          // this.limpiarEnvio();
          this.registrarDireccion();
        } else {
          this.fijarDireccionDelCliente();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  registrarDireccion() {
    if (this.envio) {
      const envio = this.parent.get('envio').value;
      const dialogRef = this.dialog.open(EnvioDireccionComponent, {
        data: {
          // direccion: envio.direccion
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.parent.get('envio').setValue({ direccion: result });
        } else {
          this.parent.get('mismaDireccion').setValue(true);
        }
      });
    }
  }

  fijarDireccionDelCliente() {
    const cliente = this.parent.get('cliente').value;
    const socio = this.parent.get('socio').value;
    if (socio) {
      this.fijarDireccionDeSocio();
    } else {
      if (cliente !== null) {
        this.parent.get('envio').setValue({
          direccion: cliente.direccion,
          condiciones: this.entrega
        });
      }
    }
  }

  fijarDireccionDeSocio() {
    const socio = this.parent.get('socio').value;
    console.log('Detectando socio de la union', socio);
    if (socio.direccion) {
      this.parent.get('envio').setValue({
        direccion: socio.direccionFiscal,
        condiciones: this.entrega
      });
    }
  }

  get disabled() {
    // return this.parent.get('cliente').value === null
    return false;
  }

  get entrega() {
    return this.parent.get('entrega').value;
  }

  limpiarEnvio() {
    this.parent.get('envio').setValue(null);
  }
}
