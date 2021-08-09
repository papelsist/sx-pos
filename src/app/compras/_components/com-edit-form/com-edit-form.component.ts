import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ITdDataTableColumn, TdDataTableComponent } from '@covalent/core/data-table/data-table.component';
import { TdDialogService } from '@covalent/core/dialogs/services/dialog.service';
import * as _ from 'lodash';

import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v.toLocaleString('en-us')

@Component({
  selector: 'sx-com-edit-form',
  templateUrl: './com-edit-form.component.html',
  styles: []
})
export class ComEditFormComponent implements OnInit {

  form: FormGroup

  @Input() com: RecepcionDeCompra;

  @Output() update = new EventEmitter<RecepcionDeCompra>();

  @ViewChild('dataTable') table: TdDataTableComponent;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 50},
    { name: 'producto.descripcion', label: 'Descripción'},
    { name: 'compraDet.solicitado', label: 'Solicitado', numeric: true, format: NUMBER_FORMAT },
    { name: 'compraDet.depurado', label: 'Depurado', width: 30, numeric: true, format: NUMBER_FORMAT },
    { name: 'cantidad', label: 'Recibido', width: 30, numeric: true, format: NUMBER_FORMAT },
    { name: 'quitar', label: 'Eliminar', width: 20},
  ];

  constructor(
    private fb: FormBuilder,
    private _dialogService: TdDialogService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('Editando com: ', this.com);
    this.buildForm()
  }

  private buildForm() {
    this.form = this.fb.group({
      remision: [this.com.remision, Validators.required],
      fechaRemision: [new Date(this.com.fecha)],
      comentario: [this.com.comentario],
      partidas: this.fb.array([])
    });
  }

  onSubmit(){
    if(this.form.valid) {
      const entity = this.prepareEntity();
      this.update.emit(entity);
    }
  }

  private prepareEntity() {
    const data = {
      ...this.form.value,
    }
    this.com.comentario = data.comentario;
    this.com.fechaRemision = data.fechaRemision;
    this.com.remision = data.remision
    return this.com
  }

  get compra(): any {
    return this.com.compra
  }

  get partidas() {
    // return this.form.get('partidas') as FormArray
    return this.com.partidas;
  }

  removePartida(index: number) {
    // this.partidas.removeAt(index);
  }


  editarPartida(row, cantidad) {
    console.log('Editando: ', row);
    console.log('Cantidad: ', cantidad);
    // this.partidas.controls[row].patchValue({cantidad: cantidad});
  }

  onDelete(row){
    this._dialogService.openConfirm({
      message: 'Producto ' + row.producto.clave + ' Cantidad: ' + row.cantidad,
      title: 'Eliminación de partidas',
      acceptButton: 'Aceptar',
      cancelButton: 'Cancelar'
    }).afterClosed().subscribe( val => {
      if (val) {
        console.log('Eliminando la partida: ' + row.id);
        _.remove(this.partidas, item => item.id === row.id);
        this.table.refresh();
      }
    })
  }

  editar(row) {
    
    const recibido = row.compraDet.recibido;
    const pendiente = row.compraDet.pendiente;
    let message = 'Registrar la cantidad a recibir' ;
    if(recibido > 0){
      message = `Registrar la cantidad a recibir (max: ${pendiente})`
    }
    this._dialogService.openPrompt({
      message: message,
      value: row.cantidad,
    }).afterClosed().subscribe((value: any) => {
      console.log('Cambios: ', value);
      if (value !== undefined ) {
        let cantidad = _.toSafeInteger(value);
        if(recibido> 0 && (cantidad > pendiente)) {
          row.cantidad = cantidad;
          console.log('Por recibir: ', row.cantidad);
          this.table.refresh();
        }
        
      }
      
    });
  }


}
