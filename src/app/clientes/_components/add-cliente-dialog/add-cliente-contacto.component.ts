import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-add-cliente-contacto',
  template: `
    <div [formGroup]="parent" layout="column" layout-align="center strech">
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Telefono 1" formControlName="telefono1">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Telefono 2" formControlName="telefono2">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Celular" formControlName="celular">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Fax" formControlName="fax">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="email" mdInput placeholder="Email Empresa" formControlName="mail">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Página web" formControlName="www">
      </md-form-field>
    </div>
  `,
  styles: ['.full-width { width: 100%; }']
})

export class AddClienteContactoComponent implements OnInit {

  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() { }
}
