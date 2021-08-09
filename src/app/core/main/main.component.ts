import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as Auth from '../../_auth/actions/auth.actions';
import * as fromAuth from '../../_auth/reducers';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'sx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  modulo$: Observable<any>;
  navegacion$: Observable<any[]>;


  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {
    this.navegacion$ = this.store.select(fromRoot.getSideNavivation);

  }

  logout() {
    this.store.dispatch(new Auth.Logout())
  }

}
