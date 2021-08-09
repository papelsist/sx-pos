import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-forma-de-pago',
  templateUrl: './forma-de-pago.component.html',
  styleUrls: ['./forma-de-pago.component.scss'],
})
export class FormaDePagoComponent implements OnInit, OnChanges {
  @Input() parent: FormGroup;

  @Input() propertyName = 'formaDePago';

  @Input() cod: boolean;

  tipos = [
    'EFECTIVO',
    'CHEQUE',
    'TRANSFERENCIA',
    'TARJETA_DEBITO',
    'TARJETA_CREDITO',
    'DEPOSITO_CHEQUE',
    'DEPOSITO_EFECTIVO',
    'DEPOSITO_MIXTO',
  ];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cod && changes.cod.currentValue) {
      this.tipos = ['EFECTIVO', 'CHEQUE', 'TARJETA_DEBITO', 'TARJETA_CREDITO'];
    } else {
      this.tipos = [
        'EFECTIVO',
        'CHEQUE',
        'TRANSFERENCIA',
        'TARJETA_DEBITO',
        'TARJETA_CREDITO',
        'DEPOSITO_CHEQUE',
        'DEPOSITO_EFECTIVO',
        'DEPOSITO_MIXTO',
      ];
    }
  }
}
