import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { TdLoadingService, TdDigitsPipe, TdMediaService } from '@covalent/core';


// import { UserService, IUser } from '../users';
// import { ItemsService, ProductsService, AlertsService } from '../../services';
import { multi } from './data';

import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from 'app/_auth/reducers';


@Component({
  selector: 'sx-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit, AfterViewInit {

  user$: Observable<any>

  view: any[] = [700, 400];

  

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
    store: Store<fromAuth.State>,
  ) { 
    this.user$ = store.select(fromAuth.getAuthentication);
      }

  ngOnInit() { 
  }

  ngAfterViewInit(): void {
    this._titleService.setTitle( 'SX-VENTAS' );
  }


}
