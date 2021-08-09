import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import {Store} from '@ngrx/store';

import * as moment from 'moment';

import * as fromRoot from './reducers';
import { SetSucursalAction } from './core/store/config/config.actions';


@Component({
  selector: 'sx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {

  constructor(private iconRegistry: MdIconRegistry,
              private domSanitizer: DomSanitizer,
              dateAdapter: DateAdapter<NativeDateAdapter>,
              private store: Store<fromRoot.State>,
              ) {
    this.iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'luxor',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/luxorLogo32.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'siipapx',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipapx.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'siipapx2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipapx2.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'siipap-rx',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipap-rx.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'siipap-rx2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipap-rx2.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'paper',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/paper.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg'));

    moment.locale('es');
    dateAdapter.setLocale('es_MX');

  }

  ngOnInit(): void {}



}
