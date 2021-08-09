import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import * as fromLogistica from 'app/logistica/store/reducers';


import { Sucursal } from 'app/models';

import { Conteo } from 'app/logistica/models/conteo';
import { ConteosService } from 'app/logistica/services/conteos/conteos.service';


@Component({
  selector: 'sx-conteo-edit-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-conteo-form [conteo]="conteo$ | async" flex [disabled]="disabled$ | async"
        [sucursal]="sucursal$ | async" (save)="onSave($event)">
      </sx-conteo-form>
    </div>
  `,
  styles: ['']
})
export class ConteoEditPageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  conteo$: Observable<Conteo>;
  disabled$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: ConteosService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
    this.conteo$ = this.store.select(fromLogistica.getSelectedConteo);
    this.disabled$ = this.route.queryParamMap.map(params => params.get('tipo') === 'show')
  }

  onSave(conteo: Conteo) {
    // console.log('Actualizando conteo: ', conteo);
    this.loadingService.register('saving');
    this.service
      .update(conteo)
      .subscribe(
        (res: any) => {
          // console.log('Actualizacion exitosa: ', res);
          this.loadingService.resolve('saving');
          // this.router.navigate(['/logistica/almacen/conteo'])
          this.router.navigate(['/logistica/almacen/conteo/show', res.id], { queryParams: { tipo: 'show' } })
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('saving');
        }
      );
  }

  private handlePostError(response) {
    console.log('Error al salvar conteo: ', response);
  }


}

