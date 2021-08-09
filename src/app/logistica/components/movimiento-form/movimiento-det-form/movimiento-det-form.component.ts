import { Component, Input, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';

import { MovimientoDet } from "@siipapx/logistica/models/movimientoDet";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'sx-movimiento-det-form',
  templateUrl: './movimiento-det-form.component.html',
  styleUrls: ['./movimiento-det-form.component.scss']
})
export class MovimientoDetFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  @Input() parent: FormGroup;

  @Output() insert = new EventEmitter<MovimientoDet>();
  
  @ViewChild('productField') 
  private productField;

  tipos = ['MATERIAL_EMPAQUE', 'PAPELERIA', 'PUBLICIDAD_PROPAGANDA', 'NO_DEDUSIBLE'];
  
  subsctiption: Subscription;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      producto: [null, Validators.required],
      cantidad: [null, [Validators.required, this.validarCantidad.bind(this)]],
      comentario: [null, Validators.maxLength(100)],
      sw2: ['SIIPAPX'], // small fix temporal
      tipoCIS: [{value: null, disabled: true}]
    }, {
      validator: this.getTipoValidator()
    });

    this.subsctiption = this.parent.get('tipo').valueChanges.subscribe( tipo => {
      if( tipo === 'CIS') {
        this.form.get('tipoCIS').enable();
      } else {
        this.form.get('tipoCIS').setValue(null);
        this.form.get('tipoCIS').disable()
      }
      
    });
  }

  ngOnDestroy(): void {
    this.subsctiption.unsubscribe();
  }

  onSubmit() {
    if(this.form.valid) {
      const entity = this.prepareEneity()
      this.insert.emit(entity);
      this.reset();
    }
  }

  prepareEneity() {
    const entity = Object.assign({}, this.form.value);
    if(this.parent.get('tipo').value === 'OIM') {
       entity.cantidad = Math.abs(entity.cantidad);
    }else if(this.parent.get('tipo').value === 'CIM') {
      entity.cantidad = entity.cantidad;
    } else if(this.parent.get('tipo').value === 'VIR') {
        entity.cantidad = Math.abs(entity.cantidad);
    }else {
      entity.cantidad = entity.cantidad * -1;
    }
    return entity;
  }

  reset() {
    this.form.reset();
    this.productField.focus();
  }

  /**
   *  Construye un ValidatorFn que verifica el tipo del padre GroupForm verificando que si se trata de  un tipo CIS
   *  la captura del tipoCIS sea obligatoria
   * 
   */
  getTipoValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} => {
      const tipoControl = this.parent.get('tipo').value;
      if (tipoControl==='CIS') {
        const tipoCIS = control.get('tipoCIS').value;
        return tipoCIS !== null ? null : {noTipoCIS: true};
      }
      return null;
    };
  }

  validarCantidad(control: AbstractControl) {
    const tipo = this.parent.get('tipo').value;    
    const cantidad = _.toNumber(control.value);
    if (tipo !== 'CIM') {
      return cantidad > 0 ? null : {noPermiteNegativo: true};
    }
    return cantidad !== 0 ? null : {noPermiteEnCeros: true};
    // return null;
  }

}
