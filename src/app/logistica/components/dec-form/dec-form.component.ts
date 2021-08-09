import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, HostListener 
} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

import { Sucursal, Producto } from "app/models";
 import { SelectorDeComDialogComponent } from "./selector-de-com/selector-de-com-dialog.component";
import { DevolucionDeCompra } from "app/logistica/models/devolucionDeCompra";
import { DevolucionDeCompraDet } from "app/logistica/models/devolucionDeCompraDet";

export const PartidasValidator = (control: AbstractControl): {[key: string]: boolean} => {
  const partidas = (control.get('partidas') as FormArray).value;
  return partidas.length ? null : { noPartidas: true };
};

@Component({
  selector: 'sx-dec-form',
  templateUrl: './dec-form.component.html',
  styleUrls: ['./dec-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecFormComponent implements OnInit {

  form: FormGroup;
  
  @Input() fecha = new Date();

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<DevolucionDeCompra>();

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {}

  buildForm(){
    this.form = this.fb.group({
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      proveedor: [null, Validators.required],
      fecha: [{value: this.fecha, disabled: true}, Validators.required],
      comentario: ['', [Validators.maxLength(100)]],
      partidas: this.fb.array([])
    },{
      validator: PartidasValidator
    });
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
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray
  }

  removePartida(index: number) {
    this.partidas.removeAt(index);
  }

  insertar() {
    const proveedor = this.form.get('proveedor').value;
    if (proveedor) {
      let dialogRef = this.dialog.open(SelectorDeComDialogComponent, {
        data: {sucursal:this.sucursal, proveedor: proveedor}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.partidas.push(new FormControl(result));
          this.cd.markForCheck();
        }
      });
    }
    
  }
  
  editarPartida($event) {
    const {row, cantidad} = $event;
    this.partidas.controls[row].patchValue({cantidad: cantidad});
  }

  onDelete(index: number){
    this.removePartida(index);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.ctrlKey && event.code === 'KeyI' ) {
      this.insertar();
    }
    if (event.code === 'Insert') {
      this.insertar();
    }
  }

  
}
