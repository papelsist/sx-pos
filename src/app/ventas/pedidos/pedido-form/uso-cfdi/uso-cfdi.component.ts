import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-uso-cfdi',
  template: `
    <ng-container [formGroup]="parent">
      <md-select
        placeholder="Uso CFDI"
        formControlName="usoDeCfdi"
        class="fill"
      >
        <md-option *ngFor="let tipo of usos" [value]="tipo.clave"
          >{{ tipo.descripcion }}
        </md-option>
      </md-select>
    </ng-container>
  `,
  styles: [
    `
      .fill {
        width: 100%;
      }
    `,
  ],
})
export class UsoCfdiComponent implements OnInit {
  @Input() parent: FormGroup;

  usos = [
    { clave: 'G01', descripcion: 'Adquisición de mercancias (G01)' },
    { clave: 'G03', descripcion: 'Gastos en general (G03)' },
    { clave: 'P01', descripcion: 'Por definir (P01)' },
  ];

  constructor() {}

  ngOnInit() {}
}
