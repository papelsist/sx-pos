import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import * as coms from 'app/logistica/store/actions/coms.actions';

import { DevolucionDeCompra } from "app/logistica/models/devolucionDeCompra";
import { Sucursal } from 'app/models';
import { DecsService } from "app/logistica/services/decs/decs.service";

@Component({
  selector: 'sx-com-create-page',
  template: `
    <div layout 
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-dec-form flex="80" 
        [sucursal]="sucursal$ | async" (save)="onSave($event)">
      </sx-dec-form>
    </div>
  `,
  styles: ['']
})
export class DecCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: DecsService,
    private router: Router,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  onSave(dec: DevolucionDeCompra) {
    console.log('Salvando DEC: ', dec);
    this.loadingService.register('saving');
    this.service
      .save(dec)
      .subscribe( 
        (dec) => {
          console.log('DEC salvado: ', dec);
          this.loadingService.resolve('saving');
          this.router.navigate(['/logistica/inventarios/decs'])
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('saving');
        }
      );
  }

  private handlePostError(response){
    console.log('Error al salvar compra: ', response);
  }


}

