import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';


import { Sucursal } from 'app/models';
import { CajasService } from '../../../services/cajas/cajas.service';


@Component({
  selector: 'sx-cotizacion-create-page',
  template: `
    <!-- <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'"
      > -->
      <div layout>
       <!-- <sx-cotizacion-form flex="80"
        [sucursal]="sucursal$ | async" (save)="onSave($event)">
      </sx-cotizacion-form> -->
      <sx-cotizacion-form></sx-cotizacion-form>
    </div>
  `,
  styles: ['']
})
export class CotizacionCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  tipo = 'SHOW';

  constructor(
    private store: Store<fromRoot.State>,
    private service: CajasService,
    private router: Router,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  onSave(cotizacion) {
    /* this.loadingService.register('saving');
    this.service
      .save(cotizacion)
      .subscribe(
        (res: any) => {
          console.log('Salvado sector: ', res);
          this.loadingService.resolve('saving');
          // this.router.navigate(['/logistica/almacen/sectores/show', res.id]);
          this.router.navigate(['/logistica/almacen/sectores']);
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('saving');
        }
      ); */
  }

  private handlePostError(response) {
    console.log('Error al salvar sector: ', response);
  }


}

