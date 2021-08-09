import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";
import { TdDialogService } from '@covalent/core';

import * as fromLogistica from 'app/logistica/store/reducers';
import { DeleteAction } from 'app/logistica/store/actions/decs.actions';
import { DevolucionDeCompra } from "app/logistica/models/devolucionDeCompra";
import { DecsService } from 'app/logistica/services/decs/decs.service';


@Component({
  selector: 'sx-dec-show-page',
  templateUrl: './dec-show-page.component.html',
  styleUrls: ['./dec-show-page.component.scss']
})
export class DecShowPageComponent implements OnInit {

  dec$: Observable<DevolucionDeCompra>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromLogistica.LogisticaState>,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: DecsService
  ) { }

  ngOnInit() {
    this.dec$ = this.store
      .select(fromLogistica.getSelectedDec)
      .shareReplay();

    this.loading$ = this.store
      .select(fromLogistica.getDecsLoading);
  }

  onDelete(dec: DevolucionDeCompra) {
    this._dialogService.openConfirm({
      message: `DEC ${dec.documento}`,
      viewContainerRef: this._viewContainerRef,
      title: 'Eliminar devolución de compra',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.store.dispatch(new DeleteAction(dec.id));
        this.router.navigate(['/logistica/inventarios/decs']);
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

  inventariar(dec){
    if(dec.fechaInventario) {
      return
    } else {
      this._dialogService.openConfirm({
        message: `Mandar al inventario  
        devolución de compra: ${dec.documento}?`,
        viewContainerRef: this._viewContainerRef, 
        title: 'Inventariar (Operación irreversible)', 
        cancelButton: 'Cancelar', 
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doInventariar(dec);
        } 
      });
    }
  }

  doInventariar(dec) {
    this.service
    .inventariar(dec)
    .catch( error => {
      console.log('Http error', error);
      return Observable.of({description: "Error al generar el movimiento de inventario"});
    }).subscribe( val => {
      console.log('Generacion de inventario: ', val);
      this.router.navigate(['/logistica/inventarios/decs']);
    });
  }

}
