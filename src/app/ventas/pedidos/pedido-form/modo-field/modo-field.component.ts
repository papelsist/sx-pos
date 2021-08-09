import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-modo-field',
  template: `
  <ng-container [formGroup]="parent">
    <md-select placeholder="Modo" formControlName="atencion" class="fill">
      <md-option *ngFor="let modo of ['MOSTRADOR','TELEFONICA']" 
        [value]="modo">{{ modo }}
      </md-option>
    </md-select>
  </ng-container>
  `,
  styles: [
    `
    .fill {
      width: 100%;
    }
    `
]
})
export class ModoFieldComponent implements OnInit {

  @Input() parent: FormGroup;
  
  constructor() { }

  ngOnInit() {
  }

}
