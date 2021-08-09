import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import * as FileSaver from 'file-saver';

import * as fromRoot from 'app/reducers';
import * as fromLogistica from 'app/logistica/store/reducers';

import { Sucursal } from 'app/models';
import { Embarque } from 'app/logistica/models/embarque';
import { Envio } from 'app/logistica/models/envio';
import * as Embarques from 'app/logistica/store/actions/embarques.actions';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';

@Component({
  selector: 'sx-transito-edit-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-transito-form flex [embarque]="embarque$ | async" (save)="onSave($event)" (print)="onPrint($event)">
      </sx-transito-form>
    </div>
  `,
  styles: ['']
})
export class TransitoEditPageComponent implements OnInit {
  sucursal$: Observable<Sucursal>;
  embarque$: Observable<Embarque>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: EmbarqueService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
    this.embarque$ = this.store.select(fromLogistica.getSelectedEmbarque);
  }

  onSave(embarque: Embarque) {
    console.log('Actualizando embarque:', embarque);
    this.loadingService.register('saving');
    this.service.update(embarque).subscribe(
      (res: any) => {
        console.log('Embarque actualizado: ', res);
        this.loadingService.resolve('saving');
        // this.router.navigate(['/logistica/almacen/sectores/show', res.id], { queryParams: { tipo: 'show' } })
        this.router.navigate(['/logistica/embarques/transito']);
      },
      response => {
        this.handlePostError(response);
        this.loadingService.resolve('saving');
      }
    );
  }

  onSaveEnvio(envio: Envio) {
    console.log('Salvar envio: ', envio);
  }

  private handlePostError(response) {
    console.log('Error al salvar embarque: ', response);
  }

  onPrint(embarque) {
    this.service.print(embarque.id).subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/pdf'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }
}
