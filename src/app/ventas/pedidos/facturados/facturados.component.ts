import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdDialog } from '@angular/material';
import * as _ from 'lodash';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';
import { EnvioDireccionComponent } from '../pedido-form/envio-direccion/envio-direccion.component';
import { Periodo } from 'app/models/periodo';

@Component({
  selector: 'sx-facturados',
  templateUrl: './facturados.component.html',
  styleUrls: ['./facturados.component.scss']
})
export class FacturadosComponent implements OnInit {
  facturas$: Observable<Venta[]>;
  procesando = false;
  search$ = new BehaviorSubject<string>('');
  selectedRows: any[] = [];
  filtro: any = { periodo: Periodo.fromNow(3) };

  constructor(
    private store: Store<fromPedidos.State>,
    private service: PedidosService,
    private router: Router,
    private loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.procesando = true;
    this.facturas$ = this.service
      .facturados(this.filtro)
      .catch(err => Observable.of(err))
      .finally(() => (this.procesando = false));
  }

  search(term: string) {
    this.search$.next(term);
  }

  print(factura: Venta) {
    if (factura.cuentaPorCobrar.cfdi !== null) {
      this.printCfdi(factura.cuentaPorCobrar.cfdi);
    } else {
      this.printRemision(factura);
    }
  }

  printCfdi(cfdi) {
    this.service
      .imprimirCfdi(cfdi)
      .delay(1000)
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },
        error2 => this.handleError(error2)
      );
  }

  printRemision(factura) {
    this.procesando = true;
    this.service.imprimirPedido(factura.id).subscribe(
      res => {
        this.procesando = false;
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      error2 => this.handleError(error2)
    );
  }

  handleError(error) {
    this.procesando = false;
    console.error('Error: ', error);
  }

  asignarEnvio(pedido: Venta) {
    const params = { direccion: null };
    if (pedido.envio) {
      params.direccion = pedido.envio.direccion;
    }
    const dialogRef = this.dialog.open(EnvioDireccionComponent, {
      data: params
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Asignando direccion de envío: ', result);
        this.doAsignarEnvio(pedido, result);
      }
    });
  }

  doAsignarEnvio(pedido: Venta, direccion) {
    this.procesando = true;
    this.service
      .asignarEnvio(pedido, direccion)
      .delay(2000)
      .finally(() => (this.procesando = false))
      .subscribe(
        (res: Venta) => {
          console.log('Envio registrado para: ', res);
          this.load();
          pedido = res;
        },
        error => console.error(error)
      );
  }

  cancelarEnvio(pedido: Venta) {
    const params = { direccion: null };
    if (pedido.envio) {
      const dialogRef = this._dialogService
        .openConfirm({
          message:
            'Cancelar envio de la factura ' + pedido.cuentaPorCobrar.documento,
          title: 'Cancelación de envío',
          viewContainerRef: this._viewContainerRef,
          acceptButton: 'Aceptar',
          cancelButton: 'Cancelar'
        })
        .afterClosed()
        .subscribe(res => {
          if (res) {
            this.doCancelarEnvio(pedido);
          }
        });
    }
  }

  doCancelarEnvio(pedido: Venta) {
    this.procesando = true;
    this.service
      .cancelarEnvio(pedido)
      .delay(2000)
      .finally(() => (this.procesando = false))
      .subscribe(
        (res: Venta) => {
          
          if(res.envio){
             
              this._dialogService.openAlert({
                title:'Cancelacion de Envío',
                message: 'Factura Asignada no se Cancelo el envio',
                closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
                
              });
          }else{
          
            this._dialogService.openAlert({
              title:'Cancelacion de Envío',
              message: 'Envio cancelado',
              closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
              
            });
          }
          this.load();
          pedido = res;
        },
        error => console.error(error)
      );
  }

  buscarPorCliente(cliente: string) {
    this.filtro.cliente = cliente;
    this.load();
  }

  buscarPorFolio(folio: string) {
    this.filtro.term = folio;
    this.load();
  }

  buscarPorUsuario(usuario: string) {
    this.filtro.usuario = usuario;
    this.load();
  }

  envioBatch() {
    const selected = this.selectedRows;
    const first = _.find(selected, item => item.nombre);
    const cliente = first.cliente;
    const filtered = _.filter(selected, item => item.cliente.id === cliente.id);

    this._dialogService
      .openPrompt({
        title: `Envio ${filtered.length} de facturas electrónicas a `,
        message: `${cliente.nombre} ${
          cliente.cfdiMailValidado ? '' : '(Email Sin Validar)'
        }: `,
        value: cliente.cfdiMail,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadingService.register('saving');
          this.service
            .envioBatch(cliente.id, selected, res)
            .finally(() => this.loadingService.resolve('saving'))
            .subscribe(
              () => {
                this._dialogService
                  .openAlert({
                    title: 'Envio batch',
                    message: 'Correo enviado satisfactoriamente',
                    closeButton: 'Cerrar'
                  })
                  .afterClosed()
                  .subscribe(() => {});
              },
              err => this.handelHttpError(err)
            );
        }
      });
  }

  cambiarPeriodo(periodo: Periodo) {
    this.filtro.periodo = periodo;
    this.load();
  }

  handelHttpError(response) {
    console.error(response);
    if (response.error) {
      this._dialogService.openAlert({
        title: 'Error de envio',
        message: response.error.message,
        closeButton: 'Cerrar'
      });
    }
  }
}
