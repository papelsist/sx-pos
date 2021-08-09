import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";
import { TdDialogService } from '@covalent/core';

import * as fromLogistica from 'app/logistica/store/reducers';
import { DeleteAction } from 'app/logistica/store/actions/devoluciones.actions';
import { DevolucionDeVenta } from "app/logistica/models/devolucionDeVenta";
import { DevolucionesService } from 'app/logistica/services/devoluciones/devoluciones.service';


@Component({
  selector: 'sx-devoluciones-show-page',
  templateUrl: './devoluciones-show-page.component.html',
  styleUrls: ['./devoluciones-show-page.component.scss']
})
export class DevolucionesShowPageComponent implements OnInit {

  devolucion$: Observable<DevolucionDeVenta>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromLogistica.LogisticaState>,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: DevolucionesService
  ) { }

  ngOnInit() {
    this.devolucion$ = this.store
      .select(fromLogistica.getSelectedDevolucion)
      .shareReplay();
    this.loading$ = this.store
      .select(fromLogistica.getDevolucionesLoading);

  }

  onDelete(rmd: DevolucionDeVenta) {
    this._dialogService.openConfirm({
      message: 'Eliminar este documento?',
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirm', //OPTIONAL, hides if not provided
      cancelButton: 'Cancelar', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Aceptar', //OPTIONAL, defaults to 'ACCEPT'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.store.dispatch(new DeleteAction(rmd.id));
        this.router.navigate(['/logistica/inventarios/devoluciones']);
      } else {
        
      }
    });
  }

  print(mov) {
    this.service.print(mov.id)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.error(error2));
      
  }

  inventariar(mov){
    if(mov.fechaInventario) {
      return
    } else {
      this._dialogService.openConfirm({
        message: `Mandar al inventario  
        devolución de venta: ${mov.documento}?`,
        viewContainerRef: this._viewContainerRef, 
        title: 'Inventariar (Operación irreversible)', 
        cancelButton: 'Cancelar', 
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doInventariar(mov);
        } 
      });
    }
  }

  doInventariar(mov) {
    this.service
    .inventariar(mov)
    .catch( error => {
      console.log('Http error', error);
      return Observable.of({description: "Error al generar el movimiento de inventario"});
    }).subscribe( val => {
      console.log('Generacion de inventario: ', val);
      this.router.navigate(['/logistica/inventarios/devoluciones']);
    });
  }

}
