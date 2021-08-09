import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { TdMessageComponent, TdLoadingService } from '@covalent/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Compra } from "app/models/compra";
import { OrdenesService } from "app/compras/services/ordenes.service";


@Component({
  selector: 'sx-ordenes-create-page',
  templateUrl: './ordenes-create-page.component.html',
  styleUrls: ['./ordenes-create-page.component.scss']
})
export class OrdenesCreatePageComponent implements OnInit {
  
  constructor(
    private ordenesService: OrdenesService,
    private loadingService: TdLoadingService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  onSave(compra: Compra) {
    this.loadingService.register('savingCompra');
    this.ordenesService
    .save(compra)
    .delay(1000)
    .subscribe( 
      (compra: any) => { 
        console.log('POST Success', compra);
        this.loadingService.resolve('savingCompra');
        this.router.navigate(['/compras/ordenes/show', compra.id])
      },
      response => {
        this.handlePostError(response);
        this.loadingService.resolve('savingCompra');
      }
    );
  }

  private handlePostError(response){
    console.log('Error al salvar compra: ', response);
  }

}
