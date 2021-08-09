import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Producto, Existencia } from "app/models";
import { ProductoService } from 'app/productos/services/producto.service';

@Component({
  selector: 'sx-prod-selector',
  templateUrl: './prod-selector.component.html',
  styleUrls: ['./prod-selector.component.scss']
})
export class ProdSelectorComponent implements OnInit, OnDestroy {

  producto: Producto;
  activos = new FormControl(true);
  deLinea = new FormControl(true);

  existencias: Existencia[] = [];

  private storeKey = 'sx.product-selector.state';
  private service: ProductoService
  
  constructor(
    public dialogRef: MdDialogRef<ProdSelectorComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) { 
    this.service = data.service
  }

  ngOnInit() {
    /*
    const state = JSON.parse(localStorage.getItem(this.storeKey));
    this.activos.setValue(state.activos);
    this.deLinea.setValue(state.deLinea);
    */
  }

  ngOnDestroy() {
    // localStorage.setItem(this.storeKey, JSON.stringify(this.stateObject()))
  }

  onSelection(producto) {
    this.producto = producto;
    this.buildExistencias();
  }

  private stateObject(){
    return {
      activos: this.activos.value,
      deLinea: this.deLinea.value
    };
  }

  get title() {
    return this.producto ? `${this.producto.descripcion} (${this.producto.clave})` : 'Catálogo de productos'
  }

  buildExistencias() {
    if (this.producto) {
      this.service
        .buscarExistencias(this.producto)
        .subscribe(exis => {
          this.existencias = exis
          // this.disponibilidadTotal =  _.sumBy(this.existencias, 'disponible');
        });
    }
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    this.dialogRef.close({});
  }


}
