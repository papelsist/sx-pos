import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { OrdenesService } from '../../services/ordenes.service';
import { Compra } from 'app/models';
import { TdDialogService } from '@covalent/core';
import { OrdenRecepcionDialogComponent } from '../../_components/orden-recepcion-dialog/orden-recepcion-dialog.component';
import { MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'sx-ordenes-page',
  templateUrl: './ordenes-page.component.html',
  styleUrls: ['./ordenes-page.component.scss']
})
export class OrdenesPageComponent implements OnInit, OnDestroy {
  ordenes$: Observable<Compra[]>;
  ordenes: Compra[] = [];
  search$ = new BehaviorSubject<string>('');
  procesando = false;
  subs: Subscription;

  selectedRows: any[] = [];

  private _pendientes = true;

  constructor(
    private service: OrdenesService,
    private dialogService: TdDialogService,
    private router: Router,
    public dialog: MdDialog
  ) {
    this.ordenes$ = this.search$.debounceTime(300).switchMap(term => {
      return this.service
        .list({ term: term, pendientes: this.pendientes })
        .do(() => (this.procesando = true))
        .delay(100)
        .catch(error2 => this.handleError(error2))
        .finally(() => (this.procesando = false));
    });

    this.subs = this.ordenes$.subscribe(ordenes => (this.ordenes = ordenes));
  }

  ngOnInit() {
    const params = JSON.parse(localStorage.getItem('ocompra_params')) || {
      pendientes: true
    };
    this._pendientes = params.pendientes;
    this.load();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  search(term: string) {
    this.search$.next(term);
  }

  load() {
    this.search$.next('');
  }

  handleError(ex) {
    console.error(ex);
    return Observable.of([]);
  }

  set pendientes(value) {
    this._pendientes = value;
    const params = { pendientes: this._pendientes };
    localStorage.setItem('ocompra_params', JSON.stringify(params));
    this.load();
  }

  get pendientes() {
    return this._pendientes;
  }

  recibir() {
    console.log('Generar recepcion de: ', this.pendienteSelected);

    const selected = this.pendienteSelected;
    if (selected) {
      const dialotRef=this.dialog.open(OrdenRecepcionDialogComponent,{width: '600px',data:{compra: selected}});
      dialotRef.afterClosed().subscribe(val => {
        console.log(val)
        if (val) {
              console.log(val)
              this.procesando = true;
              this.service
            .recibir(selected,val.remision,val.fechaRemision,val.comentario)
            .delay(2000)
            .finally(() => (this.procesando = false))
            .subscribe(
              (res: any) => {
                if (res === null) {
                  this.load();
                } else {
                  this.router.navigate(['/compras/recepciones/show', res.id]);
                }
              },
              err => console.error(err)
            );
        }
      });
    }
    


    /*
    console.log('Generar recepcion de: ', this.pendienteSelected);
    const selected = this.pendienteSelected;
    if (selected) {
      const dialotRef = this.dialogService.openConfirm({
        message:
          'Generar la recepción automática de la compra: ' + selected.folio,
        title: 'Recepción de compra',
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      });
      dialotRef.afterClosed().subscribe(val => {
        if (val) {
          this.procesando = true;
          console.log('Validar');
          this.service
            .recibir(selected)
            .delay(2000)
            .finally(() => (this.procesando = false))
            .subscribe(
              (res: any) => {
                if (res === null) {
                  this.load();
                } else {
                  this.router.navigate(['/compras/recepciones/show', res.id]);
                }
              },
              err => console.error(err)
            );
        }
      });
    }
    */
  }

  get pendienteSelected() {
    return this.selectedRows.find(item => item.pendiente && item.cerrada);
  }
}
