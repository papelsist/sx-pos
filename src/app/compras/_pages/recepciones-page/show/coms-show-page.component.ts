import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Router, ActivatedRoute } from "@angular/router";
import { TdDialogService } from '@covalent/core';
import { ComsService } from 'app/compras/services/coms.service';
import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';

@Component({
  selector: 'sx-coms-show-page',
  templateUrl: './coms-show-page.component.html',
  styleUrls: ['./coms-show-page.component.scss']
})
export class ComsShowPageComponent implements OnInit {

  procesando = false;

  com$: Observable<RecepcionDeCompra>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: ComsService
  ) { 
    this.com$ = this.route.paramMap
    .switchMap( params => 
      this.service
      .get(params.get('id'))
      .delay(1000)
      .do( () => this.procesando = true)
      .finally( () => this.procesando = false)
    );
    this.com$.subscribe( com => console.log('Mostrando COM: ', com))
  }

  ngOnInit() {
    
  }

  print(com: RecepcionDeCompra) {
    console.log('Imprimiendo COM: ', com.documento);
    this.procesando = true;
    this.service.print(com)
      .delay(1000)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        this.procesando = false;
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => this.handleError(error2));
  }

  inventariar(com) {
    if (com.fechaInventario) {
      return
    } else {
      this._dialogService.openConfirm({
        message: `Mandar al inventario
        recepción de compra: ${com.documento}?`,
        viewContainerRef: this._viewContainerRef,
        title: 'Inventariar (Operación irreversible)',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doInventariar(com);
        }
      });
    }
  }

  doInventariar(com) {
    this.procesando = true;
    this.service.inventariar(com)
      .delay(2000)
      .finally( () => this.procesando = false)
      .catch( error => {
        this.handleError(error);
        console.error('Http error', error);
        return Observable.empty() // Never completes
      }).subscribe( val => {
        console.log('Res de generacion de inventario: ', val);
        this.alert('Recepcion inventariada exitosamente, existencias actualizadas', 'Recepcion de compra')
          .afterClosed().subscribe( res => {
           console.log('OK');
          this.router.navigate(['/compras/recepciones']);
        });
      });
  }

  handleError(error) {
    this.procesando = false;
    if (error.error) {

    } else {
      this.alert(' Error: ' + error.message, 'Server error: ' + error.status );
    }
  }

  alert(msg: string, titulo: string = 'Error') {
    return  this._dialogService.openAlert({
      message: msg,
      viewContainerRef: this._viewContainerRef,
      title: titulo,
      closeButton: 'Cerrar',
    });
  }

}
