import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import {SolicitudesService} from 'app/traslados/services/solicitudes.service';
import {SolicitudDeTraslado} from 'app/logistica/models/solicitudDeTraslado';
import {Sucursal} from 'app/models';

import {Store} from '@ngrx/store';



@Component({
  selector: 'sx-sol-create-page',
  template: `
    <div layout
         *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-solicitud-de-traslado-form flex="80" [sucursal]="sucursal$ | async" (save)="onSave($event)">
        
      </sx-solicitud-de-traslado-form>
    </div>
  `,
  styles: []
})
export class SolCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor(
    private service: SolicitudesService,
    private store: Store<fromRoot.State>,
    private router: Router,
    private loadingService: TdLoadingService,
  ) {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  ngOnInit() {
  }

  onSave(sol: SolicitudDeTraslado) {
    this.loadingService.register('saving');
    this.service
      .save(sol)
      .subscribe(
        (res) => {
          this.loadingService.resolve('saving');
          this.router.navigate(['/traslados/solicitudes'])
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('saving');
        }
      );
  }

  private handlePostError(response) {
    console.log('Error al salvar solicitud de traslado: ', response);
  }

}
