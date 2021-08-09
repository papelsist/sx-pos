import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from 'app/logistica/store/reducers';
import {
  SearchAction,
  RegistrarSalidaAction
} from 'app/logistica/store/actions/embarques.actions';
import { Embarque } from 'app/logistica/models/embarque';
import { TdDialogService } from '@covalent/core';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';

@Component({
  selector: 'sx-embarque-page',
  templateUrl: './embarque-page.component.html'
})
export class EmbarquePageComponent implements OnInit {
  embarques$: Observable<Embarque[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: EmbarqueService,
    private router: Router
  ) {}

  ngOnInit() {
    this.embarques$ = this.store
      .select(fromRoot.getEmbarquesPorSalir)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getEmbarquesLoading);
    this.load();
  }

  search(folio: string) {
    // this.store.dispatch(new SearchAction({'documento': folio}));
  }

  load() {
    this.store.dispatch(new SearchAction());
  }

  print(embarque: Embarque) {
    this.service.print(embarque.id).subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/pdf'
      });
      const filename = `embarque_${embarque.documento}.pdf`;
      FileSaver.saveAs(blob, filename);
    });
  }

  onSalida(embarque: Embarque) {
    this.service.get(embarque.id).subscribe(e => {
      console.log('Embarque salida: ', e);
      if (e.partidas.length === 0) {
        this.message('Embarque sin envios no se puede registrar salida');
      } else {
        const faltante = _.find(e.partidas, envio => {
          return envio.parcial && envio.numeroDePartidas === 0;
        });
        if (faltante) {
          this.message('Embarque con envios parciales sin partidas');
        } else {
          this.registrarSalida(e);
        }
      }
    });
  }

  message(message: string) {
    this._dialogService.openAlert({
      message: message,
      viewContainerRef: this._viewContainerRef,
      title: 'Error',
      closeButton: 'Cerrar'
    });
  }

  registrarSalida(embarque: Embarque) {
    if (!embarque.salida) {
      this._dialogService
        .openConfirm({
          message: 'Registrar salida de embarue?' + embarque.documento,
          viewContainerRef: this._viewContainerRef,
          title: 'Embarques',
          cancelButton: 'Cancelar',
          acceptButton: 'Aceptar'
        })
        .afterClosed()
        .subscribe((accept: boolean) => {
          if (accept) {
            // console.log('Marcando salida de embarque para: ', embarque);
            this.service.registrarSalida(embarque).subscribe(
              res => {
                console.log('Salida registrada...', res);
                this.router.navigate(['/logistica/embarques/transito']);
              },
              error => {}
            );
          }
        });
    }
  }

  onDelete(embarque: Embarque) {
    this.service
      .delete(embarque.id)
      .subscribe(
        value => this.load(),
        error => console.error('Error al eliminar embarque ', error)
      );
  }
}
