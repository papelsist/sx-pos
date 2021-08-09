import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cobro } from '@siipapx/models/cobro';
import { AnticiposService } from '@siipapx/caja/services/anticipos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sx-anticipos',
  template: `
  <md-card>
    <div layout layout-align="start center" flex class="pad-left-sm pad-right-sm">
      <span class="push-left-sm">
        <span class="md-title">Anticipos</span>
      </span>
      <span flex></span>
      <td-search-box class="push-right-sm" placeholder="Buscar" flex (searchDebounce)="search($event)">
      </td-search-box>
      <span >
        <button md-icon-button [md-menu-trigger-for]="menu"  >
            <md-icon >more_vert</md-icon>
        </button>
        <md-menu x-position="before" #menu="mdMenu">
          <button   md-menu-item (click)="load()"><md-icon>refresh</md-icon> Refrescar</button>
        </md-menu>
      </span>
    </div>
    <md-divider></md-divider>
    <div class="table-panel">
      <sx-anticipos-table [anticipos]="anticipos$ | async" (select)="onSelect($event)"></sx-anticipos-table>
    </div>
  </md-card>
  <a md-fab color="accent" class="mat-fab-bottom-right" [routerLink]="['../anticipos/create']">
    <md-icon>add</md-icon>
  </a>
  `,
  styles: [
    `
    .table-panel {
      height: 500px;

    }
  `
  ]
})
export class AnticiposComponent implements OnInit {
  anticipos$: Observable<Cobro[]>;
  _disponibles = true;
  term = '';

  constructor(private service: AnticiposService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  search(term: string) {
    this.term = term;
    this.load();
  }

  load() {
    this.anticipos$ = this.service.list({
      disponibles: this.disponibles,
      term: this.term
    });
  }

  onSelect(row) {
    this.router.navigate(['/caja/anticipos/', row.id]);
  }

  set disponibles(val) {
    this._disponibles = val;
    this.load();
  }

  get disponibles() {
    return this._disponibles;
  }
}
