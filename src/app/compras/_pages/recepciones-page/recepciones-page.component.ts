import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';

import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';
import { ComsService } from 'app/compras/services/coms.service';
import { SelectorFechaComponent } from '@siipapx/shared/_components/selector-fecha/selector-fecha.component';

@Component({
  selector: 'sx-recepciones-page',
  templateUrl: './recepciones-page.component.html',
  styleUrls: ['./recepciones-page.component.scss']
})
export class RecepcionesPageComponent implements OnInit, OnDestroy {
  coms$: Observable<RecepcionDeCompra[]>;
  coms: RecepcionDeCompra[] = [];
  search$ = new BehaviorSubject<string>('');
  procesando = false;
  subs: Subscription;
  _pendientes = false;

  constructor(private service: ComsService, public dialog: MdDialog) {
    this.coms$ = this.search$.debounceTime(300).switchMap(term => {
      return this.service
        .list({ term: term, pendientes: this.pendientes })
        .do(() => (this.procesando = true))
        .delay(100)
        .catch(error2 => this.handleError(error2))
        .finally(() => (this.procesando = false));
    });

    this.subs = this.coms$.subscribe(coms => (this.coms = coms));
  }

  ngOnInit() {
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
    return Observable.of(ex);
  }

  recepcionDeMercancia() {
    const dialogRef = this.dialog.open(SelectorFechaComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.service.recepcionDeMercancia(result).subscribe(res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        });
      }
    });
  }

  printReport(com: RecepcionDeCompra){

    console.log('Imprimiendo COM: ', com.documento);
    this.procesando = true;
    this.service.print(com)
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

  get pendientes() {
    return this._pendientes;
  }
  set pendientes(val) {
    this._pendientes = val;
    this.load();
  }
}
