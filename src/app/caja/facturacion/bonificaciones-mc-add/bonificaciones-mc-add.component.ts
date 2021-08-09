import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import * as _ from 'lodash';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-bonificacion-mc-add',
  template: `
  <span *ngIf="disponible > 0.0">
    <span>Bonificaciones disponibles: </span>
    <span class="pad-left tc-pink-600">{{disponible |  currency: 'USD': 1.2-2}}</span>
    <button md-button color="primary" class="pad-left" [disabled]="importe <= 0.0" type="button"
        (click)="onAplicar()">Generar</button>
  </span>

  `
})
export class BonificacionesMCAddComponent implements OnInit, OnChanges {
  @Input() bonificaciones: any[] = [];
  @Input() importe = 0.0;
  @Output()
  aplicar = new EventEmitter<{ clienteId: string; importe: number }>();
  constructor(private dialogServices: TdDialogService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.importe && changes.importe.currentValue > 0) {
      // console.log('Importe a generar: ', changes.importe.currentValue);
    }
  }

  get disponible() {
    return _.sumBy(this.bonificaciones, 'disponible');
  }

  get importeBonificacion() {
    return this.importe > this.disponible ? this.disponible : this.importe;
  }

  onAplicar() {
    const porAplicar = this.importeBonificacion;
    this.dialogServices
      .openConfirm({
        message: `Importe por aplicar $ ${porAplicar}`,
        title: 'Generar disponible',
        acceptButton: 'Generar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.aplicar.emit({
            clienteId: this.bonificaciones[0].cliente.id,
            importe: porAplicar
          });
        }
      });
  }
}
