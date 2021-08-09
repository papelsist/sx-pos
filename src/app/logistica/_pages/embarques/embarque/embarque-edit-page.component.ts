import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import * as FileSaver from 'file-saver';

import * as fromRoot from 'app/reducers';
import * as fromLogistica from 'app/logistica/store/reducers';

import { Sucursal } from 'app/models';
import { Embarque } from 'app/logistica/models/embarque';
import * as Embarques from 'app/logistica/store/actions/embarques.actions';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';

@Component({
  selector: 'sx-embarque-edit-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      
      <sx-envio-form flex [embarque]="embarque$ | async" (save)="onSave($event)" 
        (print)="onPrint($event)" (deleteEnvio)="onDeleteEnvio($event)">
      </sx-envio-form>

    </div>
  `,
  styles: ['']
})
export class EmbarqueEditPageComponent implements OnInit {
  sucursal$: Observable<Sucursal>;
  embarque$: Observable<Embarque>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: EmbarqueService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
    this.embarque$ = this.store.select(fromLogistica.getSelectedEmbarque);
  }

  onSave(embarque: Embarque) {
    this.loadingService.register('saving');
    this.service.update(embarque).subscribe(
      (res: any) => {
        this.loadingService.resolve('saving');
        this.router.navigate(['/logistica/embarques/embarques']);
      },
      response => {
        this.handlePostError(response);
        this.loadingService.resolve('saving');
      }
    );
  }

  private handlePostError(response) {
    console.log('Error al salvar embarque: ', response);
  }

  onDelete(embarque: Embarque) {
    this._dialogService
      .openConfirm({
        message: `Eliminar embarque  ${embarque.documento} ?`,
        viewContainerRef: this._viewContainerRef,
        title: 'Embarques',
        cancelButton: 'Cancelar',
        acceptButton: 'Eliminar'
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          this.service.delete(embarque.id).subscribe(
            res => {
              this.router.navigate(['/logistica/embarques/embarques']);
            },
            error => {
              console.error('Error al elimnar embarque', embarque);
            }
          );
        }
      });
  }

  onDeleteEnvio(envio) {
    this.service.deleteEnvio(envio.id).subscribe(res => {
      console.log('Envio eliminado: ', res);
    });
  }

  onPrint(embarque) {
    this.service.print(embarque.id).subscribe(res => {
      let blob = new Blob([res], {
        type: 'application/pdf'
      });
      let filename = `embarque_${embarque.documento}.pdf`;
      FileSaver.saveAs(blob, filename);
    });
  }
}
