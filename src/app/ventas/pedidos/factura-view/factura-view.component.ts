import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import { MdDialog } from '@angular/material';

import * as FileSaver from 'file-saver';
import * as moment from 'moment';

import * as fromRoot from 'app/reducers';
import { Sucursal, Venta } from 'app/models';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { CancelacionDialogComponent } from 'app/ventas/_components/cancelacion-dialog/cancelacion-dialog.component';

@Component({
  selector: 'sx-factura-view',
  templateUrl: './factura-view.component.html',
  styleUrls: ['./factura-view.component.scss']
})
export class FacturaViewComponent implements OnInit {
  sucursal$: Observable<Sucursal>;
  venta$: Observable<Venta>;
  procesando = false;

  constructor(
    private store: Store<fromRoot.State>,
    private service: PedidosService,
    private loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MdDialog
  ) {}

  ngOnInit() {
    this.venta$ = this.route.paramMap.switchMap(params =>
      this.service.get(params.get('id'))
    );
    this.venta$.subscribe(venta => console.log('View venta: ', venta));

    // this.route.queryParamMap.subscribe( params => console.log(params));
  }

  load() {
    this.venta$ = this.route.paramMap.switchMap(params =>
      this.service.get(params.get('id'))
    );
    this.venta$.subscribe(v => console.log('Venta: ', v));
  }

  cancelar(factura: Venta) {
    if (factura.tipo === 'CRE') {
      // console.log('Cancelando credito...');
      this.cancelarCredito(factura);
    }
  }
  validarMismoDia(factura: Venta) {
    const hoy = new Date();
    return moment(factura.cuentaPorCobrar.fecha).isSame(hoy, 'day');
  }

  showMessage(message: string, title: string) {
    this._dialogService.openAlert({
      title: title,
      message: message,
      closeButton: 'Cerrar'
    });
  }

  cancelarCredito(factura: Venta) {
    const mismoDia = this.validarMismoDia(factura);
    if (!mismoDia) {
      this.showMessage(
        'La factura no es del día por lo tanto no se puede cancelar',
        'Cancelación de facturas'
      );
      return;
    }
    const envio = factura.envio;
    if (envio) {
      this.showMessage(
        'La factura tiene Envio asignado no se puede cancelar',
        'Cancelación de facturas'
      );
      return;
    }

    const msg = `Este proceso es IRREVERSIBLE se cancelará EL CFDI asociado,
     su cuenta por cobrar sus aplicaciones
    . El Cobro NO SE ELIMINA si tiene más aplicaciones`;
    const dialogRef = this.dialog.open(CancelacionDialogComponent, {
      data: {
        title: msg
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(' Cancelando: ', result);
        this.doCancelar(factura, result.usuario, result.motivo);
      }
    });
  }

  private doCancelar(factura: Venta, usuario, motivo) {
    this.procesando = true;
    this.service
      .cancelar(factura, usuario, motivo)
      .finally(() => (this.procesando = false))
      .subscribe(
        res => {
          const dialogRef = this.alert(
            'Venta: ' + res.documento,
            'Cancelación exitosa'
          );
          dialogRef.afterClosed().subscribe(data => {
            this.router.navigate(['/ventas/pedidos/canceladas']);
          });
        },
        error2 =>
          this.openAlert(error2.error.message, 'Error al cancelar factura')
      );
  }

  openAlert(message: string, title: string = 'Advertencia'): void {
    this._dialogService.openAlert({
      message: message,
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      title: title,
      closeButton: 'Cerrar'
    });
  }

  mandarPorCorreo(factura: Venta): void {
    this._dialogService
      .openPrompt({
        message: 'Mandar la factura (PDF y XML) al clente',
        disableClose: true,
        viewContainerRef: this._viewContainerRef,
        title: 'Envio por correo',
        value: factura.cliente.cfdiMail,
        cancelButton: 'Cancelar',
        acceptButton: 'Enviar'
      })
      .afterClosed()
      .subscribe((newValue: string) => {
        if (newValue) {
          this.doEmil(factura, newValue);
        }
      });
  }

  doEmil(factura: Venta, target: string) {
    this.procesando = true;
    this.service
      .enviarPorEmail(factura, target)
      .finally(() => (this.procesando = false))
      .subscribe((val: any) => {
        console.log('Val: ', val);
        this.openAlert('Factura enviada a: ' + val.target, 'Envio de facturas');
      });
  }

  timbrar(venta: Venta) {
    if (!venta.cuentaPorCobrar.uuid) {
      console.log('Timbrando factura: ', venta.cuentaPorCobrar);
      this.procesando = true;
      this.service.timbrar(venta).subscribe(
        cfdi => {
          this.procesando = false;
          this.load();
          console.log('Cfdi generado: ', cfdi);
        },
        error2 => this.handleError(error2)
      );
    }
  }

  mostrarXml(venta: Venta) {
    console.log('Mostrando xml');
    this.service.mostrarXml(venta).subscribe(res => {
      const blob = new Blob([res], {
        type: 'text/xml'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }

  print(venta: Venta) {
    if (
      venta.cuentaPorCobrar.cfdi === null ||
      !venta.cuentaPorCobrar.cfdi.uuid
    ) {
      this.openAlert(
        'Esta factura no es ha timbrado por lo que no se puede imprimir'
      );
      return;
    }
    if (venta.cuentaPorCobrar.cfdi.uuid) {
      this.printCfdi(venta.cuentaPorCobrar.cfdi);
    }
  }

  printCfdi(cfdi) {
    console.log('Imprimiendo cfdi: ', cfdi);
    this.procesando = true;
    this.service
      .imprimirCfdi(cfdi)
      .delay(1000)
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

  printRemision(cfdi) {
    console.log('Imprimiendo cfdi: ', cfdi);
    this.procesando = true;
    this.service.imprimirRemision(cfdi).subscribe(
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

  alert(msg: string, titulo: string = 'Error') {
    return this._dialogService.openAlert({
      message: msg,
      viewContainerRef: this._viewContainerRef,
      title: titulo,
      closeButton: 'Cerrar'
    });
  }

  onCambioDeCfdiMail(cliente) {
    // console.log('Actualizando el CFDI del cliente', cliente);
    this._dialogService
      .openPrompt({
        message: 'Digite el nuevo email para envio del CFDI',
        viewContainerRef: this._viewContainerRef,
        title: 'Cambio de CFDI',
        value: cliente.cfdiMail,
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar'
      })
      .afterClosed()
      .subscribe((newValue: string) => {
        if (newValue) {
          /* console.log('Actualizando cfdi Mail: ', newValue);
          this.procesando = true;
          this.service
            .actualizarCfdiEmail(cliente, newValue,)
            .finally(() => (this.procesando = false))
            .subscribe(
              cli => {
                console.log('correo actualizado: ', cliente);
              },
              error => console.error(error)
            ); */
        }
      });
  }
}
