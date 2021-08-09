import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ITdDataTableColumn,
  TdDialogService,
  TdLoadingService
} from '@covalent/core';

import { Compra } from 'app/models';
import { OrdenesService } from 'app/compras/services/ordenes.service';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v.toLocaleString('en-us');

@Component({
  selector: 'sx-ordenes-show',
  templateUrl: './ordenes-show.component.html',
  styleUrls: ['./ordenes-show.component.scss']
})
export class OrdenesShowComponent implements OnInit {
  orden$: Observable<Compra>;

  procesando = false;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave', label: 'Producto', width: 70 },
    { name: 'producto.descripcion', label: 'Descripcion', width: 350 },
    {
      name: 'solicitado',
      label: 'Solicitado',
      width: 70,
      numeric: true,
      format: NUMBER_FORMAT
    },
    {
      name: 'depurado',
      label: 'Depurado',
      width: 70,
      numeric: true,
      format: NUMBER_FORMAT
    },
    {
      name: 'recibido',
      label: 'Recibido',
      width: 70,
      numeric: true,
      format: NUMBER_FORMAT
    },
    {
      name: 'pendiente',
      label: 'Pendiente',
      width: 70,
      numeric: true,
      format: NUMBER_FORMAT
    },
    { name: 'comentario', label: 'Comentario', width: 200 }
  ];

  selectable = true;

  selectedRows = [];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private loadingService: TdLoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private service: OrdenesService
  ) {}

  ngOnInit() {
    this.orden$ = this.route.paramMap.switchMap(params =>
      this.service
        .get(params.get('id'))
        .finally(() => (this.procesando = false))
    );
    // this.orden$.subscribe(compra => console.log('Compra: ', compra));
  }

  onEdit(compra: Compra) {
    this.router.navigate(['/compras/ordenes/edit', compra.id]);
  }

  onCerrar(compra: Compra) {
    this._dialogService
      .openConfirm({
        message: `Compra: ${compra.folio}?`,
        viewContainerRef: this._viewContainerRef,
        title: 'Cerrar compra ',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar'
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          this.doCerrar(compra);
        } else {
        }
      });
  }

  onDelete(compra: Compra) {
    this._dialogService
      .openConfirm({
        message: `Compra: ${compra.folio}?`,
        viewContainerRef: this._viewContainerRef,
        title: 'Confirmar eliminación',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar'
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          this.doDelete(compra);
        } else {
        }
      });
  }

  doCerrar(compra: Compra) {
    this.loadingService.register('processing');
    this.service
      .cerrar(compra)
      .finally(() => this.loadingService.resolve('processing'))
      .subscribe(() => this.router.navigate(['/compras/ordenes']));
  }

  onDepurar(compra: Compra) {
    this._dialogService
      .openConfirm({
        message: 'Depurar partidas seleccionadas?',
        title: 'Depuración ',
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(val => {
        this.service
          .depurar(compra, this.selectedRows)
          .finally(() => (this.procesando = false))
          .subscribe(() => this.router.navigate(['/compras/ordenes']));
      });
  }

  doDelete(compra: Compra) {
    this.loadingService.register('processing');
    this.service
      .delete(compra.id)
      .delay(1000)
      .subscribe(
        () => {
          console.log('DELTE SUCCESS', compra);
          this.loadingService.resolve('processing');
          this.router.navigate(['/compras/ordenes']);
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('processing');
        }
      );
  }

  private handlePostError(response) {
    console.log('Error en compras: ', response);
  }

  print(compra: Compra) {
    this.procesando = true;
    this.service
      .print(compra)
      .delay(1000)
      .finally(() => (this.procesando = false))
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          this.procesando = false;
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },
        error2 => console.log(error2)
      );
  }
}
