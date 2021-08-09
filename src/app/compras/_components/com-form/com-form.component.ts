import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

import { Sucursal } from "app/models";
import { RecepcionDeCompra } from "app/logistica/models/recepcionDeCompra";
import { RecepcionDeCompraDet } from 'app/logistica/models/recepcionDeCompraDet';
import { SelectorDeCompraDialogComponent } from "./selector-de-compra/selector-de-compra-dialog.component";
import { Compra, CompraDet } from "app/models";

@Component({
  selector: 'sx-com-form',
  templateUrl: 'com-form.component.html',
  styleUrls: ['com-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  
  @Input() fecha = new Date();

  @Input() sucursal: Sucursal;

  @Input() com: RecepcionDeCompra;

  @Output() save = new EventEmitter<RecepcionDeCompra>();

  selected: CompraDet[];
  subscription1: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
    if (this.com) {
      this.form.patchValue(this.com);
    }
  }
  
  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
  

  buildForm(){
    this.form = this.fb.group({
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      fecha: [{value: this.fecha, disabled: true}, Validators.required],
      remision: ['', Validators.required],
      fechaRemision: [null, Validators.required],
      comentario: ['', [Validators.maxLength(100)]],
      compra: [null, Validators.required],
      partidas: this.fb.array([])
    });

    this.subscription1 = this.form.get('partidas')
      .valueChanges
      .map( (value: Array<RecepcionDeCompraDet> )  => _.map(value, item => item.compraDet) )
      .subscribe( coms => this.selected = coms)
   
  }
  
  onSubmit(){
    if(this.form.valid) {
      const entity = this.prepareEntity();
      this.save.emit(entity);
    }
  }

  private prepareEntity() {
    return {
      ...this.form.getRawValue(),
      proveedor: this.compra.proveedor
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray
  }

  removePartida(index: number) {
    this.partidas.removeAt(index);
  }

  asignarCompra(compra: Compra){
    if(!this.compra){
      this.form.patchValue({compra: compra});
    }
  }

  insertar() {
    
    let dialogRef = this.dialog.open(SelectorDeCompraDialogComponent, {
      data: {sucursal:this.sucursal, compra: this.compra, selected: this.selected}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // console.log('Asignando compra....', result);
        
        if(!this.compra)
          this.asignarCompra(result.compra);
        result.partidas.forEach(element => {
          
          this.insertarCompraDet(element);
        });
        this.cd.markForCheck();
      }
    });
    
  }

  insertarCompraDet(compraDet: CompraDet) {
    const fg = this.fb.group({
      compraDet:compraDet,
      cantidad: [compraDet.pendiente , Validators.required],
      producto: {
        id: compraDet.producto.id,
        clave: compraDet.producto.clave,
        descripcion: compraDet.producto.descripcion
      } 
    });
    this.partidas.push(fg);
  }

  get compra() {
    return this.form.get('compra').value;
  }
  
  editarPartida($event) {
    console.log('Editando: ', $event);
    const {row, cantidad} = $event;
    this.partidas.controls[row].patchValue({cantidad: cantidad});
  }

  onDelete(index: number){
    this.removePartida(index);
  }
  
}
