import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';

import { Cliente } from 'app/models';


@Component({
  selector: 'sx-tipo-field',
  template: `
  <ng-container [formGroup]="parent">
    <md-select placeholder="Tipo" formControlName="tipo" >
      <md-option *ngFor="let tipo of tipos"
          [value]="tipo.clave">{{ tipo.clave }}
      </md-option>
    </md-select>
  </ng-container>
  `
})
export class TipoFieldComponent implements OnInit, OnDestroy,OnChanges {

  @Input() parent: FormGroup;

  subscription: Subscription

  tipos = [
    {clave: 'CON', descripcion: 'Contado'},
    {clave: 'CRE', descripcion: 'Crédito'}
  ];

  constructor() { }

  ngOnInit() {

    console.log('Asignando al cliente');
    this.subscription = this.parent.get('cliente').valueChanges
      .distinctUntilChanged()
      .subscribe( (cliente: Cliente) => {
        if( cliente === null ) {
          this.parent.get('tipo').setValue('CON');
          this.parent.get('tipo').disable();
        } else if (cliente !== null && cliente.credito) {
          this.parent.get('tipo').enable();
          if (!this.parent.get('id').value) {
            this.parent.get('tipo').setValue('CRE');
          }
        }
      });
  }

  ngOnChanges() {
    console.log('Cambiando el cliente');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
