import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { Cobro } from 'app/models/cobro';
import { CobroService } from 'app/caja/services/cobro.service';
import { BonificacionesMCService } from 'app/caja/services/bonificacionesMC.service';

@Component({
  selector: 'sx-cobro-cod',
  templateUrl: './cobro-cod.component.html',
  styleUrls: ['./cobro-cod.component.scss']
})
export class CobroCodComponent implements OnInit, OnDestroy {
  venta$: Observable<Venta>;
  bonificaciones: any[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CajaService,
    private cobroService: CobroService,
    private bonificacionesService: BonificacionesMCService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this.venta$ = this.route.paramMap
      .map(params => params.get('id'))
      .switchMap(id => this.service.getVenta(id));

    this.subscription = this.venta$.subscribe(venta => {
      this.bonificacionesService
        .buscarBonificacionesMC(venta.cliente)
        .subscribe(res => {
          this.bonificaciones = res;
          if (res.length > 0) {
            this._dialogService.openAlert({
              message: 'Este cliente cuenta con bonificaciones disponibles',
              title: 'Bonificaciones',
              closeButton: 'Cerrar'
            });
          }
        });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCancelar() {
    this.router.navigate(['/caja/cobranzaCod']);
  }

  onSave(cobroJob) {
    console.log('Generando cobro COD par: ', cobroJob);
    this.loadingService.register('saving');
    this.service.cobroContado(cobroJob).subscribe(
      (res: any) => {
        console.log('Cobro generado exitosamente', res);
        this.loadingService.resolve('saving');
        this.router.navigate(['caja/generadas/show', res.id]);
      },
      error => {
        console.error(error);
        this.loadingService.resolve('saving');
      }
    );
  }
  onAplicarBonificaciones(event: { clienteId: string; importe: number }) {
    console.log('Generar disponible de bonificacion: ', event);
    this.loadingService.register('saving');
    this.bonificacionesService
      .generarDisponible(event.clienteId, event.importe)
      .finally(() => this.loadingService.resolve('saving'))
      .subscribe(
        res => {
          console.log('Disponibles generados: ', res);
        },
        error2 => {
          console.error(error2);
        }
      );
  }
}
