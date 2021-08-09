import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import * as coms from 'app/logistica/store/actions/coms.actions';

import { RecepcionDeCompra } from "app/logistica/models/recepcionDeCompra";
import { Sucursal } from 'app/models';
import { ComsService } from 'app/compras/services/coms.service';


@Component({
  selector: 'sx-com-create-page',
  template: `
    <sx-nav-layout [header]="'Recepciones de comras (COMS)'" [modulo]="'Compras'">
      <div layout >
        <sx-com-form flex 
          [sucursal]="sucursal$ | async" (save)="onSave($event)">
        </sx-com-form>
      </div>
    </sx-nav-layout>
  `,
  styles: ['']
})
export class ComCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: ComsService,
    private router: Router,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  onSave(com: RecepcionDeCompra) {
    console.log('Salvando recepcion de compra: ', com);
    this.loadingService.register('saving');
    this.service
      .save(com)
      .subscribe( 
        (com) => {
          console.log('COM salvado: ', com);
          this.loadingService.resolve('saving');
          this.router.navigate(['/compras/recepciones'])
          
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('saving');
        }
      );
  }

  private handlePostError(response){
    console.log('Error al salvar compra: ', response);
  }


}

