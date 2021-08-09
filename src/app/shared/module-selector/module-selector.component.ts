import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { Modulo } from '../../_modulos/models/modulo';
import { AuthService } from 'app/_auth/services/auth.service';

@Component({
  selector: 'sx-module-selector',
  templateUrl: './module-selector.component.html',
  styleUrls: ['./module-selector.component.scss']
})
export class ModuleSelectorComponent implements OnInit {

  modulos$: Observable<Modulo[]>;
  user
  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { 
    this.authService.getCurrentUser().subscribe( user => this.user = user);
  }

  ngOnInit() {
    // this.modulos$ = this.store.select(fromRoot.getModulos);
    this.modulos$ = this.store
      .select(fromRoot.getModulos).map( modulos => modulos.filter( item => this.hasRole(item)));
  }

  hasRole(modulo: Modulo){
    if(!modulo.role) return true;
    return this.user.roles.find( item => item === modulo.role);
  }

}
