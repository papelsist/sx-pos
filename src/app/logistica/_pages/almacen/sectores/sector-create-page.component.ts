import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';


import { Sucursal } from 'app/models';

import {Sector} from 'app/logistica/models/sector';
import {SectoresService} from 'app/logistica/services/sectores/sectores.service';
import * as Sectores from 'app/logistica/store/actions/sectores.actions';

@Component({
  selector: 'sx-sector-create-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-almacen-sector-form flex="80"
        [sucursal]="sucursal$ | async" (save)="onSave($event)">
      </sx-almacen-sector-form>
    </div>
  `,
  styles: ['']
})
export class SectorCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  tipo = 'SHOW';

  constructor(
    private store: Store<fromRoot.State>,
    private service: SectoresService,
    private router: Router,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  onSave(sector: Sector) {
    this.loadingService.register('saving');
    this.service
      .save(sector)
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
      );
  }

  private handlePostError(response) {
    console.log('Error al salvar sector: ', response);
  }


}

