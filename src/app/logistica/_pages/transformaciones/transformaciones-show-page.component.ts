import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TdDialogService } from '@covalent/core';

import { Transformacion } from 'app/logistica/models/transformacion';
import { TransformacionesService } from 'app/logistica/services/transformaciones/transformaciones.service';
import { ITdDataTableColumn } from '@covalent/core';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);
const NUMBER_FORMAT: (v: any) => any = (v: number) => v;

@Component({
  selector: 'sx-transformaciones-show-page',
  template: `
    <div layout layout-align="center">

      <ng-container *ngIf="transformacion$ | async; let trs">
        <md-card class="will-load" flex>

            <md-card-title>
              <span layout >
                <span>{{ trs.tipo }}</span>
                <span>-{{trs.documento}}</span>
                <span flex></span>
                <span>Fecha: {{trs.fecha | date: 'dd/MM/yyyy'}}</span>
              </span>
            </md-card-title>
            <md-card-subtitle>
              <span layout >
                <span>{{trs.comentario}} </span>
                <span *ngIf="trs.fechaInventario" class="tc-pink-600"> INVENTARIADO </span>
                <span flex></span>
                <span>Creado: {{trs.updateUser}}</span>
                <span>/ Modificado: {{trs.updateUser}}</span>
              </span>

            </md-card-subtitle>

          <md-divider></md-divider>
          <td-data-table [data]="trs.partidas" [columns]="columns">
          </td-data-table>
          <ng-template tdLoading [tdLoadingUntil]="!procesando" tdLoadingStrategy="overlay" tdLoadingType="linear">
            <md-card-actions >
              <a md-button [routerLink]="['../../']" ><md-icon>keyboard_backspace</md-icon> Regresar </a>
              <button md-icon-button mdTooltip="Imprimir documento" (click)="print(trs)"><md-icon>print</md-icon></button>
              <button md-button color="accent" *ngIf="trs.fechaInventario === undefined && !trs.cancelado"
                mdTooltip="Mandar al inventario" (click)="inventariar(trs)">
              <md-icon >send</md-icon> Mandar al inventario</button>
              <!--
              <button md-button color="warn"
                *ngIf="trs.fechaInventario == null"
                mdTooltip="Eliminar documento" (click)="onDelete(trs)" >  <md-icon >delete</md-icon> Eliminar
              </button>
                -->
            </md-card-actions>
          </ng-template>
        </md-card>
      </ng-container>

    </div>

  `
})
export class TransformacionesShowPageComponent implements OnInit {
  transformacion$: Observable<Transformacion>;

  procesando = false;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave', label: 'Producto', width: 50 },
    { name: 'producto.descripcion', label: 'Descripcion', width: 300 },
    {
      name: 'cantidad',
      label: 'Cantidad',
      numeric: true,
      format: DECIMAL_FORMAT
    },
    { name: 'cortes', label: 'Cortes', numeric: true, format: NUMBER_FORMAT },
    { name: 'cortesInstruccion', label: 'Instrucción' },
    { name: 'comentario', label: 'Comentario', width: 350 }
  ];

  constructor(
    private service: TransformacionesService,
    private router: Router,
    private route: ActivatedRoute,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.transformacion$ = this.route.paramMap
      .map(params => params.get('id'))
      .switchMap(id => this.service.get(id));
  }

  onSave(transformacion: Transformacion) {}

  onCancel() {
    this.router.navigate(['../']);
  }

  onDelete(transformacion: Transformacion) {
    this._dialogService
      .openConfirm({
        message: `${transformacion.tipo} ${transformacion.documento}`,
        viewContainerRef: this._viewContainerRef, //OPTIONAL
        title: 'Eliminar', //OPTIONAL, hides if not provided
        cancelButton: 'Cancelar', //OPTIONAL, defaults to 'CANCEL'
        acceptButton: 'Eliminar' //OPTIONAL, defaults to 'ACCEPT'
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          this.doDelete(transformacion);
        } else {
        }
      });
  }

  print(trs: Transformacion) {
    this.service
      .print(trs.id)
      .finally(() => (this.procesando = false))
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },
        error2 => console.error(error2)
      );
  }

  doDelete(trs: Transformacion) {
    this.service
      .delete(trs.id)
      .finally(() => (this.procesando = false))
      .subscribe(
        () => {
          console.log('Delete success');
          this.router.navigate(['/logistica/inventarios/transformaciones']);
        },
        response => {
          console.log('Error al intentar eliminar registro ', response);
        }
      );
  }

  inventariar(mov) {
    if (mov.fechaInventario) {
      return;
    } else {
      this._dialogService
        .openConfirm({
          message: `Mandar a inventario  registros del
        documento: ${mov.tipo}-${mov.documento}?`,
          viewContainerRef: this._viewContainerRef,
          title: 'Inventariar (Operación irreversible)',
          cancelButton: 'Cancelar',
          acceptButton: 'Aceptar'
        })
        .afterClosed()
        .subscribe((accept: boolean) => {
          if (accept) {
            this.doInventariar(mov);
          }
        });
    }
  }

  doInventariar(trs: Transformacion) {
    this.service
      .inventariar(trs)
      .catch(error => {
        console.log('Http error', error);
        return Observable.of({
          description: 'Error al generar el movimiento de inventario'
        });
      })
      .subscribe(val => {
        console.log('Generacion de inventario: ', val);
        this.router.navigate(['/logistica/inventarios/transformaciones']);
      });
  }
}
