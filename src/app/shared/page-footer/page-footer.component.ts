import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../_auth/reducers';
// import * as fromAuth from '../reducers';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '@siipapx/core/services/config.service';

@Component({
  selector: 'sx-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
})
export class PageFooterComponent implements OnInit {
  authentication$: Observable<any>;

  apiUrl: string;
  version = '1.0.59';

  constructor(store: Store<fromAuth.State>, private config: ConfigService) {
    this.authentication$ = store.select(fromAuth.getAuthentication);
  }

  ngOnInit() {
    this.apiUrl = this.config.getApiUrl();
  }
}
