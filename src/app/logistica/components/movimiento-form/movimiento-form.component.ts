import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  FormArray,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Movimiento } from 'app/logistica/models/movimiento';
import { Subscription } from 'rxjs/Subscription';

export const PartidasValidator = (
  control: AbstractControl
): { [key: string]: boolean } => {
  const partidas = (control.get('partidas') as FormArray).value;
  return partidas.length ? null : { noPartidas: true };
};

@Component({
  selector: 'sx-movimiento-form',
  templateUrl: './movimiento-form.component.html',
  styles: ['']
})
export class MovimientoFormComponent implements OnInit, OnDestroy {
  tipos = [
    { clave: 'CIM', descripcion: 'Corrección de inventario' }, //  (-/+)
    { clave: 'CIS', descripcion: 'Consumo interno' }, // (-)
    { clave: 'MER', descripcion: 'Merma ' }, // (-) Absoluto
    { clave: 'RMC', descripcion: 'Reposición de mat al cliente ' }, // (-)
    { clave: 'OIM', descripcion: 'Otros ingresos de mercancía' }, //  (+)
    { clave: 'VIR', descripcion: 'Ingreso de viruta ' } // (+)
    //{tipo: 'SMQ', descripcion: 'Salida de maquila solo en caso del modulo de maquila(-)'},
  ];

  @Output()
  save = new EventEmitter<Movimiento>();

  form: FormGroup;
  nombre$: Observable<string>;
  subscription: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group(
      {
        fecha: [{ value: new Date(), disabled: 'true' }],
        tipo: [null, Validators.required],
        porInventario: [false, Validators.required],
        comentario: ['', [Validators.required, Validators.maxLength(100)]],
        partidas: this.fb.array([])
      },
      {
        validator: PartidasValidator
      }
    );

    this.subscription = this.form
      .get('partidas')
      .valueChanges.subscribe(partidas => {
        partidas.length > 0
          ? this.form.get('tipo').disable()
          : this.form.get('tipo').enable();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSave() {
    if (this.form.valid) {
      const entity = this.preparEntity();
      this.save.emit(entity);
    }
  }

  preparEntity() {
    const entity = this.form.getRawValue();
    const partidas = this.form.get('partidas').value;
    partidas.forEach(element => {
      element.producto = element.producto.id;
    });
    return {
      ...entity,
      partidas
    };
  }

  cancel() {
    history.back();
  }

  reset() {
    this.form.get('tipo').reset();
    this.form.get('comentario').reset();
    if (this.partidas.length > 0) {
      this.form.patchValue({
        partidas: this.fb.array([])
      });
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  onInsert(partida) {
    // console.log('Agregando partida ', partida);
    this.partidas.push(new FormControl(partida));
  }

  removePartida(index: number) {
    console.log('Eliminando partida: ', index);
    this.partidas.removeAt(index);
  }
}
