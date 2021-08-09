import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from "@angular/router";
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import * as coms from 'app/logistica/store/actions/coms.actions';

import { RecepcionDeCompra } from "app/logistica/models/recepcionDeCompra";
import { Sucursal } from 'app/models';
import { ComsService } from 'app/compras/services/coms.service';

@Component({
  selector: 'sx-com-create-page',
  template: `
  <sx-nav-layout [header]="'Recepcion de compra (COM)'" [modulo]="'Compras'" >
    
    <ng-template tdLoading [tdLoadingUntil]="!procesando" tdLoadingStrategy="overlay" tdLoadingType="linear">  
      <ng-container *ngIf="com$ | async as com">  
        <div layout="row" layout-align = "center stretch">
          <sx-com-edit-form   (update)="onUpdate($event)" [com]="com" flex="80"></sx-com-edit-form> 
        </div>
      </ng-container>
    </ng-template>

  </sx-nav-layout>
`,
styles: ['']
})
export class ComEditPageComponent implements OnInit {

  procesando = false;
  
  com$: Observable<RecepcionDeCompra>;

  constructor(
    private service: ComsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.com$ = this.route.paramMap
    .switchMap( params => 
      this.service
      .get(params.get('id'))
      .do( () => this.procesando = true)
      // .delay(4000)
      .do( () => this.procesando = true)
      .finally( () => this.procesando = false)
    );
  }
  
  onUpdate(com: RecepcionDeCompra) {
    // console.log('Persistiendo: ', com);
    
    this.service
      .update(com)
      .subscribe(
        (com: any) => this.router.navigate(['/compras/recepciones/show/', com.id]),
        err => this.handlePostError(err)
      );
      
  }
  
  private handlePostError(response){
    console.log('Error al salvar compra: ', response);
  }

}
