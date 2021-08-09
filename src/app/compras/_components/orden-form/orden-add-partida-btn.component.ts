import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Proveedor } from 'app/models';

@Component({
  selector: 'sx-orden-add-partida-btn',
  template: `
  <button type="button" md-icon-button (click)="addPartida()" 
    [disabled]="disabled$ | async"
    mdTooltip="Agregar partidas"> 
    <md-icon>add</md-icon> 
  </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenAddPartidaBtnComponent implements OnInit {

  @Input() parent: FormGroup;

  @Output() add = new EventEmitter();

  disabled$: Observable<boolean>;
  
  constructor() { }

  ngOnInit() { 
    this.disabled$ = this.parent.get('proveedor')
      .valueChanges
      .startWith(null)
      .map( value => value===null)
  }

  get disabled() {
    return this.parent.get('proveedor').value === null;
  }

  addPartida(){
    this.add.emit('add');
  }
}