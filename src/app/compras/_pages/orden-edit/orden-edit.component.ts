import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TdMessageComponent, TdLoadingService } from '@covalent/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { Compra } from 'app/models/compra';
import { OrdenesService } from 'app/compras/services/ordenes.service';

@Component({
  selector: 'sx-orden-edit-page',
  template: `
  <sx-nav-layout header="Ordenes de compra" modulo="Compras" >
    <div layout *tdLoading="'savingCompra'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <ng-container *ngIf="orden$ | async as compra">
        <sx-orden-form flex="90" [compra]="compra" (save)="onSave($event)">
        </sx-orden-form>
      </ng-container>
    </div>
  </sx-nav-layout>
  `
})
export class OrdenEditComponent implements OnInit {
  orden$: Observable<Compra>;

  constructor(
    private ordenesService: OrdenesService,
    private loadingService: TdLoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private service: OrdenesService
  ) {}

  ngOnInit() {
    this.loadingService.register('savingCompra');
    this.orden$ = this.route.paramMap.switchMap(params =>
      this.service
        .get(params.get('id'))
        .finally(() => this.loadingService.resolve('savingCompra'))
    );
  }

  onSave(compra: Compra) {
    this.loadingService.register('savingCompra');
    this.ordenesService
      .update(compra)
      .finally(() => this.loadingService.resolve('savingCompra'))
      .subscribe(compraRes => {
        this.router.navigate(['/compras/ordenes/show', compra.id]);
      });
  }

  private handlePostError(response) {
    console.log('Error al salvar compra: ', response);
  }
}
