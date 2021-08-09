import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {ITdDataTableColumn, TdDialogService} from '@covalent/core';
import {MdDialog} from '@angular/material';


import { Traslado } from 'app/logistica/models/traslado';
import { TrasladosService } from 'app/traslados/services/traslados.service';


const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);

@Component({
  selector: 'sx-salida-show',
  templateUrl: './salida-show.component.html',
  styleUrls: ['./salida-show.component.scss']
})
export class SalidaShowComponent implements OnInit {

  tps$: Observable<Traslado>;
  procesando = false;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 60 },
    { name: 'producto.descripcion', label: 'Descripcion', width: 450},
    { name: 'solicitado', label: 'Solicitado', width: 100},
    { name: 'cantidad', label: 'Enviado',  width: 100},
    { name: 'comentario', label: 'Comentario', width: 350},
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog,
    private service: TrasladosService
  ) { }

  ngOnInit() {
    this.tps$ = this.route.paramMap.switchMap( params => {
      return this.service
      .get(params.get('id'))
    });
  }

  registrarSalida(tps: Traslado) {
    this._dialogService.openConfirm({
      message: `Registrar salida de: TPS ${tps.documento}`,
      viewContainerRef: this._viewContainerRef,
      title: 'Salida de  traspaso TPS',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doDarSalida(tps);
      }
    });
  }

  mostrarXml(tps: Traslado) {
    this.service.mostrarXml(tps)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'text/xml'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }

  private doDarSalida(tps: Traslado) {
    this.procesando = true;
    this.service.darSalida(tps)
    .finally( () => this.procesando = false)
    .subscribe( res => {
      // console.log('Salida generada para: ', res);
      this.router.navigate(['/traslados/salidas']);
    }, error2 => console.error(error2))
  }
  
  print(tps: Traslado) {
    this.procesando = true;
    this.service.print(tps)
      .finally( () => this.procesando = false)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.error(error2));
  }

  timbrar(tps: Traslado): void {
    this._dialogService.openConfirm({
      message: 'Timbrar el TPS ' + tps.documento,
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      title: 'Timbrado de CFDI',
      cancelButton: 'Cancelar',
      acceptButton: 'Timbrar',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        this.doTimbrar(tps);
      }
    });
  }
  
  doTimbrar(tps: Traslado) {
    if (!tps.uuid) {
      this.procesando = true;
      this.service.timbrar(tps)
        .finally( () => this.procesando = false)
        .catch( error2 => {
          // console.log('Error de timbrado: ', error2)
          this.handleError(error2, 'Error timbrando TPS: ' + tps.documento);
          return Observable.of(error2)
        })
        .subscribe( res => {
          console.log('Timbrado: ', res);
          this.router.navigate(['/traslados/salidas']);
        })
    }
  }

  handleError(error, title: string = 'Advertencia') {
    this._dialogService.openAlert({
      message: JSON.stringify(error),
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      title: title,
      closeButton: 'Cerrar',
    });
  }

  

}

