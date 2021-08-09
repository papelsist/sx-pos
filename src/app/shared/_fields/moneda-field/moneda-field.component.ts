import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Moneda, MONEDAS} from '../../../models/moneda';

@Component({
  selector: 'sx-moneda-field',
  templateUrl: './moneda-field.component.html',
  styleUrls: ['./moneda-field.component.scss']
})
export class MonedaFieldComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() monedas: Moneda[] = MONEDAS;

  @Input() monedaProperty = 'moneda';

  constructor() { }

  ngOnInit() {
  }

}
