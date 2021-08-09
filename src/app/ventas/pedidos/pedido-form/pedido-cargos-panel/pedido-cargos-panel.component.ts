import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'sx-pedido-cargos-panel',
  templateUrl: './pedido-cargos-panel.component.html',
  styleUrls: ['./pedido-cargos-panel.component.css']
})
export class PedidoCargosPanelComponent implements OnInit {

  @Input() parent: FormGroup;

  disabled$: Observable<boolean>;

  constructor() { }

  ngOnInit() {

    const cortes$ = this.parent.get('corteImporte').valueChanges;
    const tarjeta$ = this.parent.get('comisionTarjetaImporte').valueChanges;

    this.disabled$ = Observable.combineLatest(cortes$, tarjeta$, (cortes, tarjeta) => {
      return (cortes > 0 || tarjeta > 0);
    }); // .map(value => value === 0)
    /*
    this.disabled$ = this.parent.get('comisionTarjetaImporte')
      .valueChanges
      .map( value => value === 0)
      .startWith(true);
      */
  }

  get comisionTarjeta() {
    return this.parent.get('comisionTarjeta').value;
  }

}
