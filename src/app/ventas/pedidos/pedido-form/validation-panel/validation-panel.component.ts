import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'sx-validation-panel',
  templateUrl: './validation-panel.component.html',
  styleUrls: ['./validation-panel.component.scss']
})
export class ValidationPanelComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() surtido;


  errors = new Set();
  constructor() { }

  ngOnInit() {

  }

  get invalid() {
   this.errors.clear();
   this.errors.add( this.parent.hasError('importeMuyBajo'));
   return this.errors;
  }

  get invalidMessage() {

    this.errors.clear();


    if (this.parent.hasError('importeMuyBajo')) {
     this.errors.add( 'Importe mínimo para venta es de $10.00');
    }
    if (this.parent.hasError('codSinEnvio')) {
     this.errors.add( 'Requiere configurar el envío si es pedido COD');
    }
    if (this.parent.hasError('codConFormaDePagoIncorrecta')) {
     this.errors.add( 'Forma de pago no permitida en COD');
    }
    if (this.parent.hasError('entregaSinEnvio')) {
     this.errors.add( 'Se requiere configurar la direccion de envío ');
    }
    if (this.parent.hasError('noSePermiteFormaDeCheque')) {
     this.errors.add( 'No se permite forma de pago CHEQUE para este cliente');
    }
    if (this.parent.hasError('totalMaximoPermitido')) {
     this.errors.add( 'Monto máxmo permitido para pago en efectivo es de $100,000');
    }
    if (this.parent.hasError('sinConfiguracionDeVale')) {
     this.errors.add( 'Debe registrar la configuración del vale de traslado');
    }
    if (this.parent.hasError('seRequiereSocio')) {
     this.errors.add( 'Se requiere registrar el socio de la union de credito');
    }
    // Validaciones del cliente
    if (this.parent.hasError('clienteSuspendido')) {
     this.errors.add( 'Cliente suspendido');
    }

    if (this.parent.hasError('creditoSuspendido')) {
        this.errors.add('Credito suspendido, llamar al departamento de crédito');

    }

    if (this.parent.hasError('atrasoMaximo')) {
     this.errors.add( 'Cliente con atraso superior a 7 días');
    }

    if (this.parent.hasError('lineaSaturada')) {
     this.errors.add( 'Línea de crédito saturada');
    }

    if (this.parent.hasError('clienteEnJuridico')) {
     this.errors.add( 'Cliente en tramite jurídico');
    }

    if (this.parent.hasError('clienteConChequesDevueltos')) {
     this.errors.add( 'Cliente con cheque(s) devueltos');
    }

    if (this.surtido) {
      this.errors.add( 'Pedido en Surtido');
    }

     return this.errors;
    }

}
