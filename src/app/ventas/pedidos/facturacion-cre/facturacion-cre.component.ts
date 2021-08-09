import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import {TdDialogService, TdLoadingService} from '@covalent/core';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';



@Component({
  selector: 'sx-facturacion-cre',
  templateUrl: './facturacion-cre.component.html',
  styleUrls: ['./facturacion-cre.component.scss']
})
export class FacturacionCreComponent implements OnInit {

  pendientes$: Observable<Venta[]>;
  pedidos$: Observable<Venta[]>;
  search$ = new BehaviorSubject<string>('');
  procesando = false;

  constructor(
    private store: Store<fromPedidos.State>,
    private service: PedidosService,
    private router: Router,
    private loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { 

    this.pendientes$ = this.service
      .pendientesDeFacturar('CRE')
      .catch( err => Observable.of(err))
      .finally( ()=> this.procesando = false);

    this.pedidos$ = this.pendientes$
      .combineLatest(this.search$, (pedidos: Venta[], term: string) => {
        if (!term) {
          return pedidos
        } else {
          return pedidos.filter( (value: Venta) => value.documento.toString() === term)
        }
      });
  }

  ngOnInit() {}

  load() {
    /*
    this.service.pendientesDeFacturar('CRE')
      .subscribe(
        pedidos => this.pedidos = pedidos,
        error2 => console.error('Error al cargar pendienetes ', error2));
        */
  }

  search(term: string) {
    this.search$.next('');
  }

  facturar(pedido: Venta) {

    if (pedido.facturar && pedido.tipo === 'CRE') {
      this._dialogService.openConfirm({
        message: `Facturar el pedido ${pedido.tipo} - ${pedido.documento} (${pedido.total})` ,
        viewContainerRef: this._viewContainerRef,
        title: 'Ventas de crédito',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doFacturar(pedido);
        }
      });
    }
  }

  doFacturar(pedido: Venta) {
    this.loadingService.register('saving');
    this.service
      .facturar(pedido)
      .delay(1000)
      .subscribe( (res: Venta) => {
        console.log('Pedido facturado:', res);
        this.timbrar(res);
        this.loadingService.resolve('saving');
      }, error => {
        console.error(error);
        this.loadingService.resolve('saving');
      });
  }

  timbrar(venta: Venta) {
    if (!venta.cuentaPorCobrar.uuid) {
      this.procesando = true;
      this.service.timbrar(venta)
        .subscribe( cfdi => {
          this.procesando = false;
          this.printCfdi(cfdi);
          this.showFactura(venta);
          
        }, error2 => {
          this.handleError(error2);
          this.showFactura(venta);
        })
    }
  }


  showFactura(factura: Venta) {
    this.router.navigate(['/ventas/pedidos/facturados/show', factura.id]);
  }

  printCfdi(cfdi) {
    console.log('Imprimiendo cfdi: ', cfdi);
    this.procesando = true;
    this.service.imprimirCfdi(cfdi)
      .delay(500)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        this.procesando = false;
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => this.handleError(error2));
  }

  regresarAVentas(pedido: Venta) {
    pedido.facturar = null
    this._dialogService.openConfirm({
      message: `Regresar a pendientes el pedido ${pedido.tipo} - ${pedido.documento} (${pedido.total})` ,
      viewContainerRef: this._viewContainerRef,
      title: 'Ventas de crédito',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doRegresar(pedido);
      }
    });
  }

  doRegresar(pedido) {
    this.loadingService.register('saving');
    this.service
      .update(pedido)
      .delay(1000)
      .subscribe( res => {
        this.loadingService.resolve('saving');
        this.router.navigate(['/ventas/pedidos/pendientes']);
      }, error => {
        console.error(error);
        this.loadingService.resolve('saving');
      });
  }

  handleError(error) {
    this.procesando = false;
    console.error('Error: ', error);
  }

}

