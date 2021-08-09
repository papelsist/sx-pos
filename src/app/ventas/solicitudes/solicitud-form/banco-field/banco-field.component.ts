import { Component, OnInit, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Banco} from 'app/ventas/models/banco';
import {BancoService} from 'app/ventas/services/banco.service';

@Component({
  selector: 'sx-banco-field',
  template: `
    <ng-container [formGroup]="parent">
      <md-select placeholder="Banco origen" formControlName="banco" class="fill" >
        <md-option *ngFor="let banco of bancos$ | async; trackBy: trackById" [value]="banco">
          {{banco.nombre}}
        </md-option>
      </md-select>
    </ng-container>
  `,
  styles: [`
    .fill {
      width: 100%;
    }
  `]
})
export class BancoFieldComponent implements OnInit {

  bancos$: Observable<Banco[]>;

  @Input() parent: FormGroup;

  @Input() propertyName = 'banco';


  constructor(
    private service: BancoService
  ) { }

  ngOnInit() {
    this.bancos$ = this.service.list();
  }

  trackById(index: number, banco: any): number {
    return banco.id;
  }

}
