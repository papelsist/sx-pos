import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Producto } from 'app/models';
import { MdDialog } from '@angular/material';

import { ProdSelectorComponent } from '../_components/prod-selector/prod-selector.component';
import { ProductoService } from 'app/productos/services/producto.service';



@Injectable()
export class ProductUtils {

  constructor(
    public dialog: MdDialog,
    private service: ProductoService
  ) { }

  /**
   *  Presenta un dialog para seleccionar un producto
   */
  openSelector() {
    /*
    const dialogRef = this.dialog.open(PedidoDetFormComponent, {
      data: {
        sucursal: config.sucursal,
        tipo: this.tipo,
        partida: det,
        preciosPorCliente: this.preciosPorCliente
      }
    });
    */
    const dialogRef = this.dialog.open(ProdSelectorComponent, {
      data: {
        service: this.service
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if ( result ) {
        console.log('Producto seleccionado: ', result);
      }
    });
  }
}
