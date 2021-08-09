import { Component, OnInit, Input } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

import { Banco } from 'app/models/banco';
import { environment} from 'environments/environment';
import { ConfigService } from 'app/core/services/config.service';


@Component({
  selector: 'sx-bancos-field',
  template: `
    <ng-container [formGroup]="parent">
      <md-select placeholder="Banco" [formControlName]="propertyName" class="fill" >
        <md-option *ngFor="let banco of bancos$ | async; " [value]="banco">
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
    private http: HttpClient,
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.bancos$ = this.bancos();
  }

  bancos(): Observable<Banco[]> {
    // const url = environment.apiUrl + '/tesoreria/bancos';
    const url = this.config.buildApiUrl('tesoreria/bancos');
    return this.http.get<Banco[]>(url);
 }

}
