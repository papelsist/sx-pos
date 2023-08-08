import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';
import { MdDialog } from '@angular/material';
import { Venta } from 'app/models';
import { PartidasDialogComponent } from '../../../_components/partidas-dialog/partidas-dialog.component';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { PedidosService } from '../../services/pedidos.service';
import { ValeAutomaticoDialogComponent } from '@siipapx/shared/_components/vale-automatico-dialog/vale-automatico-dialog.component';

@Component({
  selector: 'sx-pedidos-pendientes-list',
  templateUrl: './pendientes-list.component.html',
  styleUrls: ['./pendientes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendientesListComponent implements OnInit {
  @Input() pedidos: Venta[];

  @Output() edit = new EventEmitter<any>();

  @Output() facturar = new EventEmitter<any>();

  @Output() envio = new EventEmitter<any>();

  @Output() cancelarEnvio = new EventEmitter<any>();

  @Output() print = new EventEmitter<any>();

  @Output() generarVale = new EventEmitter<any>();

  @Output() cambioDeCliente = new EventEmitter<any>();

  @Output() puesto = new EventEmitter<any>();
  @Output() quitarPuesto = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() cambiarDireccion = new EventEmitter<any>();
  @Output() quitarConVale = new EventEmitter<any>();

  @Input() canQuitarPuesto = false;

  columns: ITdDataTableColumn[] = [
    // { name: 'tipo',  label: 'Tipo', width: 10 },
    { name: 'documento', label: 'Docto', width: 30 },
    { name: 'fecha', label: 'Fecha', width: 10 },
    { name: 'nombre', label: 'Cliente', width: 280 },
    { name: 'cod', label: 'COD', width: 5 },

    // { name: 'formaDePago', label: 'F.P', width: 30 },
    { name: 'total', label: 'Total', width: 25 },
    { name: 'createUser', label: 'Creado', width: 50 },
    // { name: 'updateUser', label: 'Modificado', width: 50 },ç
    { name: 'comentario', label: 'Comentario', width: 160 },
    { name: 'operaciones', label: 'Opc', width: 250 },
  ];

  constructor(public dialog: MdDialog,
    private loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private service: PedidosService
    ) {}

  ngOnInit() {
    console.log('Can quitar puesto: ', this.canQuitarPuesto);
    console.log(this.pedidos);
  }

  changeDate(fecha) {
    if (fecha) {
      const fechaFmt = new Date(fecha.substring(0, 10).replace(/-/g, '\/'));
      return fechaFmt
    }
    return fecha
  }

  onEdit(pedido: Venta) {
    if (pedido.callcenter || pedido.sw2 || (pedido.noFacturable && !pedido.cotizacion )) {
      return;
    }
    this.edit.emit(pedido);
  }

  onFacturar(pedido: Venta) {
    this.facturar.emit(pedido);
  }

  getFormaDePago(row: Venta) {
    let fp = row.formaDePago;
    switch (row.formaDePago) {
      case 'TARJETA_DEBITO':
        fp = 'TAR_DEB';
        break;
      case 'TARJETA_CREDITO':
        fp = 'TAR_CRE';
        break;
      case 'TRANSFERENCIA':
        fp = 'TRANSF';
        break;
      case 'DEPOSITO_EFECTIVO':
        fp = 'DEP_EFE';
        break;
      case 'DEPOSITO_CHEQUE':
        fp = 'DEP_CHE';
        break;
      default:
        break;
    }
    return fp;
  }

  permitirCambioDeCliente(venta: Venta) {
    if (venta.tipo !== 'CRE') {
      if (venta.descuento <= venta.descuentoOriginal) {
        return true;
      }
    }
    return false;
  }

  envioMail(pedido: Venta) {
   /*  const selected = this.selectedRows;
    const first = _.find(selected, item => item.nombre);
    const cliente = first.cliente;
    const filtered = _.filter(selected, item => item.cliente.id === cliente.id); */

    this._dialogService
      .openPrompt({
        title: `Enviode facturas electrónicas a `,
        message: `Send mail `,
        value: pedido.cliente.cfdiMail,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadingService.register('saving');
          this.service.envioCotizacion( pedido, res )
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
            // err => this.handelHttpError(err)
          );
        /*   this.service
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
            ); */
        }
      });
  }



  showDetails(pedido: Venta) {
    const id = pedido.id;
    const dialogRef = this.dialog.open(PartidasDialogComponent, {
      data: { pedido: pedido },
    });
  }

  generarValeExistenciaVenta(pedido: Venta) {
    if (pedido.clasificacionVale === 'EXISTENCIA_VENTA') {
          const dialogRef = this.dialog.open(ValeAutomaticoDialogComponent, {
            data: {
              pedido: pedido
            },
          }).afterClosed().subscribe((res) => {
           this.generarVale.emit(res)
          });
    }
  }


}
