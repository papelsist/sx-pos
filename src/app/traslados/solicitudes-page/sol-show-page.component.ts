import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';

import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
import { SolicitudesService } from 'app/traslados/services/solicitudes.service';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);

@Component({
  selector: 'sx-sol-show-page',
  templateUrl: './sol-show-page.component.html',
  styles: []
})
export class SolShowPageComponent implements OnInit {
  sol$: Observable<SolicitudDeTraslado>;
  loading$: Observable<boolean>;
  procesando = false;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave', label: 'Producto', width: 50 },
    { name: 'producto.descripcion', label: 'Descripcion', width: 450 },
    { name: 'solicitado', label: 'Solicitado', numeric: true, width: 100 },
    {name: 'cortesInstruccion', label: 'Corte'},
    {
      name: 'recibido',
      label: 'Recibido',
      numeric: true,
      format: DECIMAL_FORMAT,
      width: 100
    },
    { name: 'comentario', label: 'Comentario', width: 400 }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: SolicitudesService
  ) {}

  ngOnInit() {
    this.sol$ = this.route.paramMap.switchMap(params =>
      this.service.get(params.get('id'))
    );
  }

  onDelete(sol: SolicitudDeTraslado) {
    /*
    this._dialogService.openConfirm({
      message: `SOL ${sol.documento}`,
      viewContainerRef: this._viewContainerRef,
      title: 'Eliminar solicitud de traslado',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doDelete(sol);
      }
    });
    */
  }

  private doDelete(sol: SolicitudDeTraslado) {
    this.procesando = true;
    this.service
      .delete(sol.id)
      .finally(() => (this.procesando = false))
      .subscribe(
        () => {
          this.router.navigate(['/traslados/solicitudes']);
        },
        error2 => console.error(error2)
      );
  }

  print(sol: SolicitudDeTraslado) {
    this.procesando = true;
    this.service
      .print(sol.id)
      .finally(() => (this.procesando = false))
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },
        error2 => console.error(error2)
      );
  }
}
