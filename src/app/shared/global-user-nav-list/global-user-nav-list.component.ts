import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import * as Auth from '../../_auth/actions/auth.actions';
import * as fromAuth from '../../_auth/reducers';

@Component({
  selector: 'sx-global-user-nav-list',
  template: `
    <md-nav-list >
      <a  md-list-item [routerLink]="['/users/account']">
        <md-icon>tune</md-icon> Cuenta de acceso
      </a>
      <a  md-list-item (click)="logout()">
        <md-icon>exit_to_app</md-icon> Salir del sistema
      </a>
    </md-nav-list>
  `,
  styles: []
})
export class GlobalUserNavListComponent implements OnInit {

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new Auth.Logout())
  }

}
