import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { Modulo } from '../../_modulos/models/modulo';

import { AuthService } from 'app/_auth/services/auth.service';

@Component({
  selector: 'sx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  application$: Observable<any>;
  modulos$: Observable<Modulo[]>;
  user;

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {
    // this.application$ = store.select(fromRoot.getApplication).delay(500);
    this.application$ = Observable.of({
      nombre: 'SX-POS ',
      descripcion: 'Sistema punto de venta',
      image: '/assets/images/pexels-photo-425047.png',
    });
    this.authService.getCurrentUser().subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.modulos$ = this.store
      .select(fromRoot.getModulos)
      .map((modulos) => modulos.filter((item) => this.hasRole(item)));
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle('SX-POS');
  }

  resolveLink(modulo: Modulo): string {
    return modulo.path ? modulo.path : modulo.nombre.toLowerCase();
  }

  hasRole(modulo: Modulo) {
    if (!modulo.role) return true;
    return this.user.roles.find((item) => item === modulo.role);
  }
}
