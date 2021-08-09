import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Auth from 'app/_auth/actions/auth.actions';
import * as fromAuth from 'app/_auth/reducers';


@Component({
  selector: 'sx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private store: Store<fromAuth.State>
  ) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new Auth.Logout())
  }

}
