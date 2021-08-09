
import { Component, OnInit, ViewContainerRef,Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import * as _ from 'lodash';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';
import { CambioDeClienteComponent } from 'app/ventas/pedidos/cambio-de-cliente/cambio-de-cliente.component';
import { UsuarioDialogComponent } from 'app/shared/_components/usuario-dialog/usuario-dialog.component';
import { Periodo } from 'app/models/periodo';
import { EnvioDireccionComponent } from '../../../pedidos/pedido-form/envio-direccion/envio-direccion.component';
import { AutorizacionDeVentaComponent } from '../../../pedidos/autorizacion-de-venta/autorizacion-de-venta.component';


@Component({
  selector: 'sx-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.component.html',
  styleUrls: ['./pedidos-pendientes.component.scss']
})
export class PedidosPendientesComponent implements OnInit {

  @Input() user: any;

  pedidos$: Observable<Venta[]>;
  

  procesando = false;

    search$ = new BehaviorSubject<string>('');

  reload$ = new Subject<boolean>();

  loading = false;
  filtro: any = { periodo: Periodo.fromNow(1) };

  constructor(
    private store: Store<fromPedidos.State>,
    private service: PedidosService,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog
  ) {

   
    const obs1 = this.search$
      .asObservable()
      .distinctUntilChanged()
      .debounceTime(300);

    const obs2 = this.reload$.asObservable().startWith(true);

    this.pedidos$ = Observable.combineLatest(obs1, obs2, (term, reload) => {
      return term ? term : this.user;
    }).switchMap(term =>
      this.service
        .pendientes(term, this.filtro)
        .delay(300)
        .finally(() => (this.procesando = false))
    );
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.procesando = true;
    this.reload$.next(true);
  }

  search(term: string) {
    this.search$.next(term);
  }

  onEdit(pedido: Venta) {
    // console.log('Editando pedido: ', pedido);
    if (pedido.moneda === 'USD') {
      this.router.navigate(['/ventas/pedidos/dolares/edit', pedido.id]);
    } else if (pedido.tipo === 'ANT') {
      this.router.navigate(['/ventas/pedidos/anticipo/edit', pedido.id]);
    } else {
      this.router.navigate(['/ventas/pedidos/edit', pedido.id]);
    }
  }

  mandarFacturar(pedido: Venta) {
    if (pedido.facturar) {
      return;
    }
    if (pedido.ventaIne && !pedido.complementoIne) {
      this._dialogService.openAlert({
        title: 'Venta de tipo INE',
        message:
          'Se requirere registrar el complemento INE antes de mandar a factura',
        closeButton: 'Cerrar'
      });
      return;
    }
    if (pedido.sinExistencia) {
      this.mandarFacturarConAntorizacion(
        pedido,
        'SIN_EXISTENCIA',
        'Este pedido tiene partidas sin existencia requiere autorización',
        'ROLE_GERENTE'
      );
    } else if (pedido.descuento > pedido.descuentoOriginal) {
      this.mandarFacturarConAntorizacion(
        pedido,
        'DESCUENTO_ESPECIAL',
        'Este pedido tiene partidas con descuento especial requiere de autorización',
        'ROLE_SUPERVISOR'
      );
    } else {
      this.mandarFacturarNormal(pedido);
    }
  }

  mandarFacturarNormal(pedido: Venta) {
    const message = `
    Mandar a facturar pedido: ${pedido.tipo} ${pedido.documento}`;
    const dialogRef = this.dialog
      .open(UsuarioDialogComponent, {
        data: {
          title: message
        }
      })
      .afterClosed()
      .subscribe(user => {
        if (user) {
          pedido.facturarUsuario = user.username;
          console.log('Mandando facturar: ', pedido);
          this.service.mandarFacturar(pedido).subscribe(
            res => {
              console.log('Pedido listo para facturación', res);
              this.load();
            },
            error => this.handleError(error)
          );
        }
      });
  }

  mandarFacturarNormal2(pedido: Venta) {
    this._dialogService
      .openConfirm({
        message: `Mandar a facturar el pedido ${pedido.tipo} - ${
          pedido.documento
        } (${pedido.total})`,
        viewContainerRef: this._viewContainerRef,
        title: 'Ventas',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar'
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          this.service.mandarFacturar(pedido).subscribe(
            res => {
              console.log('Pedido listo para facturación', res);
              this.load();
              // this.router.navigate(['/ventas/pedidos/facturacionCredito']);
            },
            error => this.handleError(error)
          );
        }
      });
  }

  mandarFacturarConAntorizacion(
    pedido: Venta,
    tipo: string,
    title: string,
    role: string
  ) {
    const params = {
      tipo: tipo,
      title: title,
      solicito: pedido.updateUser,
      role: role
    };
    const dialogRef = this.dialog.open(AutorizacionDeVentaComponent, {
      data: params
    });
    dialogRef.afterClosed().subscribe(auth => {
      if (auth) {
        auth.venta = pedido;
        console.log('Facturacion: ', auth);
        this.service.mandarFacturarConAutorizacion(auth).subscribe(
          res => {
            console.log('Pedido listo para facturación', res);
            this.load();
            // this.router.navigate(['/ventas/pedidos/facturacionCredito']);
          },
          error => this.handleError(error)
        );
      }
    });
  }

  envio(pedido: Venta) {
    if (pedido.envio) {
      this.cancelarEnvio(pedido);
    } else {
      this.asignarEnvio(pedido);
    }
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
    this.service.asignarEnvio(pedido, direccion).subscribe(
      (res: Venta) => {
        // console.log('Direccion asignada exitosamente ', res);
        this.load();
        pedido = res;
      },
      error => this.handleError(error)
    );
  }
  cancelarEnvio(pedido: Venta) {
    const params = { direccion: null };
    if (pedido.envio) {
      const dialogRef = this._dialogService
        .openConfirm({
          message: 'Cancelar envio del pedido ' + pedido.documento,
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
      .finally(() => (this.procesando = false))
      .subscribe(
        (res: Venta) => {
          console.log('Envio cancelado para: ', res);
          this.load();
          pedido = res;
        },
        error => console.error(error)
      );
  }

  print(id: string) {
    // console.log('Imprimiendo pedido: ', id);
    this.procesando = true;
    this.service
      .imprimirPedido(id)
      .delay(500)
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          this.procesando = false;
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

  OnGenerarVale(pedido: Venta) {
    if (pedido.clasificacionVale === 'EXISTENCIA_VENTA') {
      this._dialogService
        .openConfirm({
          message: `Generar vale ${pedido.tipo} - ${pedido.documento} (${
            pedido.total
          })`,
          viewContainerRef: this._viewContainerRef,
          title: 'Vale de traslado ',
          cancelButton: 'Cancelar',
          acceptButton: 'Aceptar'
        })
        .afterClosed()
        .subscribe((accept: boolean) => {
          if (accept) {
            this.service.generarValeAutomatico(pedido).subscribe(
              res => {
                // console.log('Vale para pedido generado exitosamente', res);
                this.load();
              },
              error => this.handleError(error)
            );
          }
        });
    }
  }

  onCambioDeCliente(venta: Venta) {
    const dialogRef = this.dialog.open(CambioDeClienteComponent, {
      data: {
        documento: venta.documento,
        tipo: venta.tipo
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(' Aplicando cambio: ', result);
        this.procesando = true;
        this.service
          .cambioDeCliente(venta, result.usuario, result.cliente)
          .finally(() => (this.procesando = false))
          .subscribe(
            res => {
              this.load();
            },
            error => this.handleError(error)
          );
      }
    });
  }

  cambiarPeriodo(periodo: Periodo) {
    this.filtro.periodo = periodo;
    this.load();
  }

  noFacturablesCambioPrecios(){
    console.log("Cambio de precios");
    this.procesando=true;
    this.service.noFacturables()
    .finally(() => (this.procesando = false))
    .subscribe(
      res => {
        this.load();
      },
      error => this.handleError(error)
    );
  }


}
