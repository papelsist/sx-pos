import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import { Sucursal } from 'app/models';
import { Embarque } from 'app/logistica/models/embarque';

import * as Embarques from 'app/logistica/store/actions/embarques.actions';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';

@Component({
  selector: 'sx-embarque-create-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-embarque-form flex
        [sucursal]="sucursal$ | async" (save)="onSave($event)">
      </sx-embarque-form>
    </div>
  `,
  styles: ['']
})
export class EmbarqueCreatePageComponent implements OnInit {
  sucursal$: Observable<Sucursal>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: EmbarqueService,
    private router: Router,
    private loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  onSave(embarque: Embarque) {
   
    this.loadingService.register('saving');  
    this.service.save(embarque).subscribe(
      (res: any) => {
        this.loadingService.resolve('saving');
        this.router.navigate(['/logistica/embarques/embarques']);
      },
      response => {
        this.handlePostError(response);
        this.loadingService.resolve('saving');
      }
    );
  }

  private handlePostError(response) {
    console.log('Error al salvar sector: ', response);
  }
}
