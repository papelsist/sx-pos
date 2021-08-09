import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'sx-tipo-de-cambio',
  templateUrl: './tipo-de-cambio.component.html',
  styleUrls: ['./tipo-de-cambio.component.scss']
})
export class TipoDeCambioComponent implements OnInit {


  @Input() parent: FormGroup;

  @Input() tipoDeCambioProperty = 'tipoDeCambio';

  constructor() { }

  ngOnInit() {
  }

}
