import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {TdDialogService} from '@covalent/core';



import * as fromRoot from 'app/reducers';
import {Sucursal, Venta} from 'app/models';
import { CajaService } from '../../services/caja.service';

@Component({
  selector: 'sx-factura-show',
  templateUrl: './factura-show.component.html',
  styleUrls: ['./factura-show.component.scss']
})
export class FacturaShowComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  venta$: Observable<Venta>;
  procesando = false;

  constructor(
    private store: Store<fromRoot.State>,
    private service: CajaService,
    private _dialogService: TdDialogService,

    private _viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.venta$ = this.route.paramMap
      .switchMap( params => this.service.getVenta(params.get('id')));
    // this.venta$.subscribe(v => console.log('Venta: ', v));
  }

  load() {
    this.venta$ = this.route.paramMap
      .switchMap( params => this.service.getVenta(params.get('id')));
    // this.venta$.subscribe(v => console.log('Venta: ', v));
  }

  cancelar(factura: Venta) {
    this._dialogService.openConfirm({
      message: `Este proceso es IRREVERSIBLE se cancela EL CFDI asociado, su cuenta por cobrar sus aplicaciones
        . El Cobro NO SE ELIMINA es necesario hacerlo el en la seccion de Cobros registrados`,
      viewContainerRef: this._viewContainerRef,
      title: `Cancelación de factura: ${factura.tipo}-${factura.cuentaPorCobrar.documento} Total: ${factura.total}`,
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      console.log('Cancelando factura: ', factura.cuentaPorCobrar.documento);
      if (accept) {
        this.doCancelar(factura);
      }
    });
  }

  private doCancelar(factura: Venta) {
    this.procesando = true;
    this.service
      .cancelar(factura)
      .finally( () => this.procesando = false)
      .subscribe( res => {
        const dialogRef = this.alert( 'Venta: ' + res.documento, 'Cancelación exitosa');
        dialogRef.afterClosed().subscribe( data => {
          this.router.navigate(['/caja/generadas']);
        });
      }, error2 => this.openAlert(error2.error.message, 'Error al cancelar factura')  );
  }

  openAlert(message: string, title: string = 'Advertencia'): void {
    this._dialogService.openAlert({
      message: message,
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      title: title,
      closeButton: 'Cerrar',
    });
  }

  mandarPorCorreo(factura: Venta): void {
    this._dialogService.openPrompt({
      message: 'Mandar la factura (PDF y XML) al clente',
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      title: 'Email',
      value: factura.cliente.email,
      cancelButton: 'Cancelar',
      acceptButton: 'Enviar',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        this.doEmil(factura);
      }
    });
  }

  doEmil(factura: Venta) {
    Observable
      .of(true)
      .delay(1000)
      .subscribe( val => this.openAlert('Factura enviada', 'Envio de facturas'));
  }

  timbrar(venta: Venta) {
    if (venta.cuentaPorCobrar && !venta.cuentaPorCobrar.uuid) {
      console.log('Timbrando factura: ', venta.cuentaPorCobrar);
      this.procesando = true;
      this.service.timbrar(venta)
        .finally( () => this.procesando = false)
        .subscribe( cfdi => {
          this.load();
          console.log('Cfdi generado: ', cfdi);
        }, error2 => {
          console.error('Error timbrando factura: ', error2);
          if (error2.error) {
            this.openAlert(error2.error.message, 'Error al timbrar factura');
          } else {
            const message = error2.status
            this.openAlert(error2.message, 'Error ' + error2.status);
          }
        });
    }
  }

  mostrarXml(venta: Venta) {
    console.log('Mostrando xml');
    this.service.mostrarXml(venta)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'text/xml'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }

  print(venta: Venta) {
    if ( venta.cuentaPorCobrar.cfdi === null || venta.cuentaPorCobrar.cfdi.uuid === null) {
      this.openAlert('Esta factura no es ha timbrado por lo que no se puede imprimir')
    }
    if (venta.cuentaPorCobrar.cfdi) {
     this.printCfdi(venta.cuentaPorCobrar.cfdi);
    }
  }

  printCfdi(cfdi) {
    console.log('Imprimiendo cfdi: ', cfdi);
    this.procesando = true;
    this.service.imprimirCfdi(cfdi)
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

  handleError(error) {
    this.procesando = false;
    console.error('Error: ', error);
  }

  alert(msg: string, titulo: string = 'Error') {
    return this._dialogService.openAlert({
      message: msg,
      viewContainerRef: this._viewContainerRef,
      title: titulo,
      closeButton: 'Cerrar',
    });
  }

}

