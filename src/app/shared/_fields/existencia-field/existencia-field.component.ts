import {Component, Input, OnInit, OnDestroy,
  forwardRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { Existencia } from 'app/models';
import { environment} from 'environments/environment';
import { Sucursal } from 'app/models/sucursal';
import { ConfigService } from 'app/core/services/config.service';

export const EXISTENCIA_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => ExistenciaFieldComponent),
  multi: true,
}

@Component({
  selector: 'sx-existencia-field',
  providers: [EXISTENCIA_LOOKUPFIELD_VALUE_ACCESSOR],
  template: `
  <md-form-field  class="fill" >
    <input type="text" mdInput [formControl]="searchControl" (blur)="onBlur()"
      [placeholder]="placeholder" #inputField
      [required]="required"
      [mdAutocomplete]="auto">
    <md-error>
      Seleccione un producto
    </md-error>
  </md-form-field>

  <md-autocomplete #auto="mdAutocomplete" [displayWith]="displayFn" >
    <md-option *ngFor="let existencia of existencias$ | async " [value]="existencia" 
      [ngClass]="{'tc-red-800': !(existencia.cantidad > 0)}">
      ({{existencia.producto.clave}}) {{existencia.producto.descripcion}} 
      <span >(Exis: {{existencia.cantidad}})</span>
      <span *ngIf="!existencia.producto.activo">(Suspendido)</span> 
    </md-option>
  </md-autocomplete>

  `,
  styles: ['.fill { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExistenciaFieldComponent implements OnInit, ControlValueAccessor, OnDestroy {

 private apiUrl: string; // = environment.apiUrl + '/existencias';

  searchControl: FormControl;

  @Input() required = true;

  @Input() activos = true;

  @Input() conExistencia = true;

  @Input() placeholder = 'Seleccione un producto';

  @Input() sucursal: Sucursal = undefined;

  @Input() exclude: string[] = [];

  existencias$: Observable<Existencia[]>;

  onChange;
  onTouch;
  subscription: Subscription;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('existencias');
   }

  ngOnInit() {
    this.searchControl = new FormControl(null, Validators.required);

    this.existencias$ = this.searchControl
      .valueChanges
      .startWith(null)
      .switchMap( term => this.lookupExistencia(term))
      .map( existencias => _.differenceWith(existencias, this.exclude, (exis: any, clave) => {
        return exis.producto.clave === clave;
      }))
      ;

    this.prepareControl();
  }

  private prepareControl() {
    this.subscription = this.searchControl
      .valueChanges
      .skip(1)
      .filter( value => value !== null)
      .subscribe( value => {
        if ( _.isObject(value)) {
          this.onChange(value);
        } else {
          // this.onChange(null);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  lookupExistencia(term: string): Observable<Existencia[]> {
    let params = new HttpParams()
      .set('term', term);
    if (this.sucursal) {
      params = params.set('sucursal', this.sucursal.id)
    }
    if(this.activos) {
      params = params.set('activos', 'activos')
    }
    if(this.conExistencia) {
      params = params.set('conexistencia', 'conexistencia')
    }
    return this.http.get<Existencia[]>(this.apiUrl, {params: params});
  }

  displayFn(existencia: Existencia) {
    return existencia ? `(${existencia.producto.clave}) ${existencia.producto.descripcion}
    Exis: ${existencia.cantidad}  ${existencia.producto.presentacion}` : '';
  }

  writeValue(obj: any): void {
    this.searchControl.setValue(obj);
    if(obj === null) {
      this.searchControl.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.searchControl.disable() : this.searchControl.enable();
  }

  focus() {
    this.inputField.nativeElement.focus();
  }

  onBlur() {
    if(this.onTouch) {
      this.onTouch();
    }
  }

}
