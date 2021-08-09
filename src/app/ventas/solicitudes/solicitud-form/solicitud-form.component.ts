import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import * as _ from 'lodash';

import { Sucursal } from 'app/models';
import { SolicitudDeDeposito } from 'app/ventas/models/solicitudDeDeposito';
import {Cliente} from 'app/models';
import { Observable } from 'rxjs/Observable';
import { SolicitudesService } from '../services/solicitudes.service';

export function ImporteValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const efectivo = control.get('efectivo').value || 0;
    const cheque = control.get('cheque').value || 0;
    const transferencia = control.get('transferencia').value || 0;
    const total = efectivo + cheque + transferencia;
    return total <= 0 ? {'totalInvalido': {value: control.value}} : null;
  };
}

@Component({
  selector: 'sx-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SolicitudFormComponent implements OnInit, OnChanges {

  form: FormGroup;

  duplicada: SolicitudDeDeposito ;

  duplicate = false;

  obs$: Observable<any>;


  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<any>();

  @Input() solicitud: SolicitudDeDeposito;



  constructor(
    private fb: FormBuilder, private service: SolicitudesService
  ) {

  }

  ngOnInit() {
    this.buildForm();
    this.form.get('transferencia').valueChanges.subscribe( val => {
      if(val > 0) {
        this.form.get('efectivo').disable();
        this.form.get('cheque').disable();
        this.form.get('efectivo').setValue(0);
        this.form.get('cheque').setValue(0);

      } else {
        this.form.get('efectivo').enable()
        this.form.get('cheque').enable()
      }
    });


    this.form.valueChanges.subscribe(
      res => {
        if ( this.form.valid) {
          console.log('Evaluando  la form')
          let  bancoOri = this.form.controls['banco'].value;
          let  bancoDes = this.form.controls['cuenta'].value;
          let  fechaDep = this.form.controls['fechaDeposito'].value;
          let  importe = Number(this.form.controls['efectivo'].value) + Number(this.form.controls['cheque'].value);
              importe = importe + Number(this.form.controls['transferencia'].value);

          this.obs$ = this.service.buscarDupicada( bancoOri, bancoDes, fechaDep, importe)
          this.obs$.subscribe(
            res => {
              
              if ( res[0] !== 'OK' ) {

                this.duplicada = res;
                this.duplicate = true;

              }else {

                this.duplicate    = false;
              }
          },
          );
        }else {
        
          this.duplicate = false;
        }
        
      }
  );

    // Observable.combineLatest(
    //   this.form.get('efectivo').valueChanges.startWith(0),
    //   this.form.get('cheque').valueChanges.startWith(0), (cheque, efectivo) => {
    //     console.log('Efecfivo: ' + efectivo)
    //     console.log('Cheque: ' + cheque)
    //     return (efectivo + cheque) > 0;
    //   })
    //   .subscribe(val => {
    //     console.log('Val: ', val);
    //     if(!val) {
    //       this.form.get('transferencia').disable();
    //     } else {
    //       this.form.get('transferencia').enable();
    //     }
    //   });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.solicitud && !changes.solicitud.isFirstChange()) {

       console.log('Editando solicitud: ', changes.solicitud.currentValue);
      const solicitud: SolicitudDeDeposito = _.clone(changes.solicitud.currentValue);

      const fecha = new Date(solicitud.fecha);
      const sol =  {
        ...this.solicitud,
        fecha: new Date(this.solicitud.fecha),
        fechaDeposito: new Date(this.solicitud.fechaDeposito),
        // solicita: solicitud.createUser
      }
      this.form.patchValue(sol);

    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      fecha: [new Date(), Validators.required],
      cliente: [null, Validators.required],
      efectivo: 0,
      cheque: 0,
      transferencia: 0,
      fechaDeposito: [null, Validators.required],
      referencia: [''],
      banco: [null, Validators.required],
      cuenta: [null, Validators.required],
    //  dato1: [null, Validators.required],
    // dato2: [null, Validators.required],
    // dato3: [null, Validators.required],
      comentario: [{value: null, disabled: true}, [Validators.maxLength(100)]],
      solicita: [null, Validators.required]
    }, {validator: ImporteValidator()});
  }

  onSubmit() {
    if (this.form.valid) {
      const entity = this.prepareEntity();
      // console.log('Salvando: ', entity);
      this.save.emit(entity);
    }
  }

  private prepareEntity(): SolicitudDeDeposito {
    const efectivo = this.form.get('efectivo').value || 0.0;
    const cheque = this.form.get('cheque').value || 0.0;
    const transferencia = this.form.get('transferencia').value || 0.0
    const res = {
      ...this.form.getRawValue(),
      cliente: {
        id: this.cliente.id,
      },
      efectivo: _.toNumber(efectivo),
      cheque: _.toNumber(cheque),
      transferencia: _.toNumber(transferencia),
      fechaDeposito: this.form.get('fechaDeposito').value.toISOString(),
      updateUser: this.form.get('solicita').value.username,
      referencia: this.form.get('referencia').value || 'ND'
    }
    if (!this.id) {
      res.createUser = res.updateUser
    }
    return res;
  }

  get id() {
    return this.form.get('id').value;
  }

  get fecha() {
    return this.form.get('fecha').value;
  }

  get banco() {
    return this.form.get('banco').value;
  }

  get cuenta() {
    return this.form.get('cuenta').value;
  }

  get cliente(): Cliente {
    return this.form.get('cliente').value;
  }

  isEditable() {
    if (this.id !== null) {

      const comentario: string = this.form.get('comentario').value;
      // console.log('Editable', comentario);
      if (comentario === null || comentario.length === 0) {

        return false;
      }
    }

    return true;
  }

  setAtendio(user) {
    this.form.get('solicita').setValue(user);
  }

  get solicita() {
    return this.form.get('solicita').value;
  }

}

