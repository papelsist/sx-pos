import { Component, OnInit, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {BancoService} from 'app/ventas/services/banco.service';
import {CuentaDeBanco} from 'app/ventas/models/cuentaDeBanco';


@Component({
  selector: 'sx-cuenta-field',
  template: `
    <ng-container [formGroup]="parent">
      <md-select placeholder="Cuenta destino" [formControlName]="propertyName" class="fill">
        <md-option *ngFor="let cuenta of cuentas$ | async" [value]="cuenta">
          {{cuenta.descripcion}} ({{cuenta.numero}})
        </md-option>
      </md-select>
    </ng-container>
  `,
  styles: [`
    .fill {
      width: 100%;
    }
  `]
})
export class CuentaFieldComponent implements OnInit {

  cuentas$: Observable<CuentaDeBanco[]>;

  @Input() parent: FormGroup;

  @Input() propertyName = 'cuenta';


  constructor(
    private service: BancoService
  ) { }

  ngOnInit() {
    this.cuentas$ = this.service.findCuentasBancarias();
  }

}
