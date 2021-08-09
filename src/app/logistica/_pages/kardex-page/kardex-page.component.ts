import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { KardexService } from '../../services/kardex.service';
import { Inventario } from 'app/logistica/models/inventario';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { KardexFormComponent } from 'app/logistica/_pages/kardex-page/kardex-form/kardex-form.component';
import { RecalculoFormComponent } from 'app/logistica/_pages/kardex-page/recalculo-form/recalculo-form.component';


@Component({
  selector: 'sx-kardex-page',
  templateUrl: './kardex-page.component.html',
  styleUrls: ['./kardex-page.component.scss']
})
export class KardexPageComponent implements OnInit {

  movimientos$: Observable<Inventario[]>;
  search$ = new BehaviorSubject<string>('');
  procesando = false;

  constructor(
    private service: KardexService,
    public dialog: MdDialog,
    private _dialogService: TdDialogService
  ) {
    this.movimientos$ = this.search$
    .debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => {
      this.procesando = true;
      return this.service
      .list(term)
      .catch( err => {
        this.handleError(err)
        return Observable.of([])
      })
      .finally( ()=> this.procesando = false);
    });
   }

  ngOnInit() {
    
  }

  search(term: string) {
    this.search$.next(term);
  }

  handleError(error){
    this.procesando = false;
    console.debug('Error: ', error)
  }

  runKardex(){
    const dialogRef = this.dialog.open(KardexFormComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Karded: ', result);
        this.procesando = true;
        this.service.print(result)
        .delay(100)
        .finally( () => this.procesando = false)
        .subscribe(res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        }, error2 => this.handleError(error2));
      }
    });
  }

  recalcular() {
    const dialogRef = this.dialog.open(RecalculoFormComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Recalculo de existencias: ', result);
        this.procesando = true;
        this.service.recalcular(result.producto)
        .do( () => this.showMessage(result.producto ? 'Recalculando producto: ' + result.producto.clave: 'Recalculando todos los productos', 'Recalculo de existencia'))
        // .delay(5000)
        .finally( () => this.procesando = false)
        .subscribe(res => {
          console.log('Recalculo terminado res: ', res)
        }, error2 => this.handleError(error2));
      }
    });
  }

  private showMessage(msg: string, title: string) {
    this._dialogService.openAlert({
      message: msg,
      title: title,
      closeButton: 'Cerrar'
    })
  }

}
