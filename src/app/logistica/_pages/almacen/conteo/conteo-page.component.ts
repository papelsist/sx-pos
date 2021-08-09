import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import {TdDialogService} from '@covalent/core';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/conteos.actions';
import { GenerarConteoAction } from 'app/logistica/store/actions/conteos.actions';
import { Conteo } from 'app/logistica/models/conteo';
import { ConteosService } from 'app/logistica/services/conteos/conteos.service';


@Component({
  selector: 'sx-almacen-conteo-page',
  templateUrl: './conteo-page.component.html',
})
export class ConteoPageComponent implements OnInit {

  conteos$: Observable<Conteo[]>;
  loading$: Observable<boolean>;
  procesando$ = new BehaviorSubject(false);
  // procesando = false;


  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: ConteosService,
  ) { }

  ngOnInit() {
    this.conteos$ = this.store
      .select(fromRoot.getConteos)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getConteosLoading);
    this.load();
  }

  search(folio: string) {
    this.store.dispatch(new SearchAction({'documento': folio}));
  }

  load() {
    this.store.dispatch(new SearchAction());
  }

  cargaSector() {
      this._dialogService.openPrompt({
        message: 'Teclee el sector a cargar',
        // disableClose: true , // defaults to false
        viewContainerRef: this._viewContainerRef, // OPTIONAL
        title: 'Cargar Sector', // OPTIONAL, hides if not provided
        // value: 'Prepopulated value', // OPTIONAL
        cancelButton: 'Cancel', // OPTIONAL, defaults to 'CANCEL'
        acceptButton: 'Ok', // OPTIONAL, defaults to 'ACCEPT'
       // width: '400px', // OPTIONAL, defaults to 400px
      }).afterClosed().subscribe((newValue: string) => {
        if (newValue) {
          // DO SOMETHING
          console.log('Cargando Sector: ', newValue);
          this.doCargarSector(newValue);
        } else {
          // DO SOMETHING ELSE
        }
      });
  }

  doCargarSector(sector) {
    console.log('Cargando Sector_', sector);
      this.service.cargarSector(sector).subscribe(data=>{
       this.load()
      })
  }

  genearConteo() {
    this._dialogService.openConfirm({
      message: `Cargar sectores ?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Conteo de inventario',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doGenerarConteo();
      }
    });
  }

  private doGenerarConteo() {
    console.log('Generando Conteos');
    this.store.dispatch(new GenerarConteoAction());
  }

  generarExistencias() {
    this._dialogService.openConfirm({
      message: `Generar las existencias para el conteo ?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Conteo de inventario',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doGenerarExistencias();
      }
    });
  }

  private doGenerarExistencias() {
    this.procesando$.next(true);
    console.log('Generando Conteos');
    this.service.generarExistencias()
    .delay(2000)
    .subscribe(
      (result: any) => {
        console.log('Proceso terminado: ', result);
        this.procesoTerminado(result.message, 'Generar Existencias');
        this.procesando$.next(false);
      }
      , error => {
        console.error('Error ', error)
        this.procesando$.next(false);
      }
    )
    // this.store.dispatch(new GenerarConteoAction());
  }

  generarExistenciaParcial() {
    this._dialogService.openConfirm({
      message: `Generar las existencias para el conteo ?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Conteo de inventario',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doGenerarExistenciaParcial();
      }
    });
  }

  private doGenerarExistenciaParcial() {
    this.procesando$.next(true);
    console.log('Generando Conteos');
    this.service.generarExistenciaParcial()
    .delay(2000)
    .subscribe(
      (result: any) => {
        console.log('Proceso terminado: ', result);
        this.procesoTerminado(result.message, 'Generar Existencias');
        this.procesando$.next(false);
      }
      , error => {
        console.error('Error ', error)
        this.procesando$.next(false);
      }
    )
    // this.store.dispatch(new GenerarConteoAction());
  }

  limpiarExistencias() {
    this._dialogService.openConfirm({
      message: `Limpiar las existencias para el conteo ?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Conteo de inventario',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doLimpiarExistencias();
      }
    });
  }

  private doLimpiarExistencias() {
    this.procesando$.next(true);
    this.service.limpiarExistencias()
    .subscribe(
      (result: any) => {
        console.log('Proceso terminado: ', result);
        this.procesoTerminado(result.message, 'Generacion de Existencias');
        this.procesando$.next(false);
        this.load()
      }
      , error => {
        console.error('Error ', error)
        this.procesando$.next(false);
      }
    )
    // this.store.dispatch(new GenerarConteoAction());
  }

  private procesoTerminado(message: string, titulo: string) {
    this._dialogService.openAlert({
      message: message,
      viewContainerRef: this._viewContainerRef,
      title: titulo,
      closeButton: 'Cerrar',
    });
  }

  print(row: any) {
    this.service.print(row.id)
      .do( () => this.procesando$.next(true))
      .finally( () => this.procesando$.next(false))
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.log(error2));
  }

  imprimirSectoresConteo() {
    this.service.imprimirSectoresConteo()
      .do( () => this.procesando$.next(true))
      .finally( () => this.procesando$.next(false))
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.log(error2));
  }

  fijarConteo() {
    console.log('Fiando el conteo');
    this._dialogService.openConfirm({
      message: `Fijar el conteo ?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Conteo de inventario',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doFijarConteo();
      }
    });
  }

  doFijarConteo() {
    this.procesando$.next(true);
    
    this.service.fijarConteo().delay(2000).subscribe(
      (result: any) => {
      console.log('Proceso terminado: ', result);
      this.procesoTerminado(result.message, 'Fijar conteo');
      this.procesando$.next(false);
    }
    , error => {
      console.error('Error ', error)
      this.procesando$.next(false);
    });
  }


  ajustarConteo() {
    console.log('Ajstando el conteo');
    this._dialogService.openConfirm({
      message: `Ajustar el inventario ?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Ajuste de inventario',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doAjustarConteo();
      }
    });
  }

  doAjustarConteo() {
    console.log('Do ajustar conteo');
    this.procesando$.next(true);

    this.service.ajustarConteo().delay(2000)
    .subscribe(
      (result: any) => {
      console.log('Proceso terminado: ', result);
      this.procesoTerminado(result.message, 'Ajustar conteo');
      this.procesando$.next(false);
    }
    , error => {
      console.error('Error ', error)
      this.procesando$.next(false);
    });
  }

  get title() {
    return 'Configuración de conteo físico de invenario';
  }

}
