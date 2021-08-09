import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'sx-uso-cfdi-field',
  template: `
    <div layout [formGroup]="parent">
      <md-select placeholder="Uso de CFDI" formControlName="usoDeCfdi" flex class="fill">
        <md-option *ngFor="let uso of usosDeCfdi" [value]="uso.clave">
          {{uso.descripcion}}
        </md-option>
      </md-select>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsoCfdiFieldComponent implements OnInit {

  @Input() parent: FormGroup;

  usosDeCfdi: [{clave: string, descripcion: string}] = [
    {clave: 'G01', descripcion: 'Adquisición de mercancias (G01)'},
    /*{clave: 'G02', descripcion: 'Devoluciones, descuentos o bonificaciones (G02)'},
    {clave: 'G03', descripcion: 'Gastos en general (G03)'}*/
  ];

  constructor() { }

  ngOnInit() {
  }

}
