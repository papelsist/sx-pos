import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import * as FileSaver from 'file-saver';

import * as fromRoot from 'app/reducers';
import * as fromLogistica from 'app/logistica/store/reducers';

import { Sucursal } from 'app/models';
import { Embarque } from 'app/logistica/models/embarque';
import * as Embarques from 'app/logistica/store/actions/embarques.actions';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import { Envio } from 'app/logistica/models/envio';
import { Venta } from 'app/models/venta';
import { VentaDet } from 'app/models/ventaDet';

@Component({
  selector: 'sx-envio-edit-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-envio-parcial-form (update)="onUpdate($event)"
        [envio]="envio$ | async"
        [partidasDeVenta]="partidasParaEnvio$ | async">
      </sx-envio-parcial-form>
    </div>
  `,
  styles: ['']
})
export class EnvioEditPageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  partidasParaEnvio$: Observable<VentaDet>;
  envio$: Observable<Envio>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: EmbarqueService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);

    this.envio$ = this.route.paramMap
      .switchMap(map => this.service.getEnvio(map.get('id')));

    this.partidasParaEnvio$ = this.sucursal$
    .combineLatest(this.envio$)
    .switchMap( val => {
      const sucursal = val[0];
      const envio = val[1];
      return this.service
      .buscarPartidasDeVenta(sucursal.id, envio.entidad, envio.documento, envio.fechaDocumento);
    });
  }

  onUpdate(envio: Envio) {
    // console.log('Salvando: ', envio);
    this.loadingService.register('saving');
    this.service
      .updateEnvio(envio)
      .subscribe(
        (res: any) => {
          console.log('Envio actualizado: ', res);
          this.loadingService.resolve('saving');
          // this.router.navigate(['/logistica/almacen/sectores/show', res.id], { queryParams: { tipo: 'show' } })
          this.router.navigate(['/logistica/embarques/embarques/edit', envio.embarque.id]);
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('saving');
        }
      );
  }

  onSave(embarque: Embarque) {

  }

  private handlePostError(response) {
    console.log('Error al salvar embarque: ', response);
  }

  onPrint(embarque) {
    this.service.print(embarque.id)
    .subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/pdf'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }


}

