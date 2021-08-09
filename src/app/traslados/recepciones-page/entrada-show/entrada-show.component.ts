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
  selector: 'sx-entrada-show',
  templateUrl: './entrada-show.component.html',
  styleUrls: ['./entrada-show.component.scss']
})
export class EntradaShowComponent implements OnInit {

  tpe$: Observable<Traslado>;
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
    this.tpe$ = this.route.paramMap.switchMap( params => {
      return this.service
      .get(params.get('id'))
    });
  }

  registrarEntrada(tpe: Traslado) {
    this._dialogService.openConfirm({
      message: `Registrar entrada de: TPE ${tpe.documento}`,
      viewContainerRef: this._viewContainerRef,
      title: 'Entrada de material via TPE',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doDarEntrada(tpe);
      }
    });
  }

  private doDarEntrada(tpe: Traslado) {
    this.procesando = true;
    this.service.darEntrada(tpe)
    .finally( () => this.procesando = false)
    .subscribe( res => {
      // console.log('Salida generada para: ', res);
      this.router.navigate(['/traslados/recepciones']);
    }, error2 => console.error(error2))
  }
  
  print(tpe: Traslado) {
    this.procesando = true;
    this.service.print(tpe)
      .finally( () => this.procesando = false)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.error(error2));
  }

}

