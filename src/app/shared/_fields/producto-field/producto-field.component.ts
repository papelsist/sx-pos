import {Component, Input, OnInit, OnDestroy,
  forwardRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

import { Producto } from 'app/models';
import { environment} from 'environments/environment';
import { ConfigService } from 'app/core/services/config.service';

export const PRODUCTO_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => ProductoFieldComponent),
  multi: true,
}

@Component({
  selector: 'sx-producto-field',
  providers: [PRODUCTO_LOOKUPFIELD_VALUE_ACCESSOR],
  templateUrl: './producto-field.component.html',
  styleUrls: ['./producto-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductoFieldComponent implements OnInit, ControlValueAccessor, OnDestroy {

  // readonly apiUrl = environment.apiUrl + '/productos';
  private apiUrl: string;

  searchControl = new FormControl();

  @Input() required = false;

  @Input() activos: boolean = true;

  @Input() placeholder = "Seleccione un producto";

  productos$: Observable<Producto[]>;

  onChange;
  onTouch;
  subscription: Subscription;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('productos');
   }

  ngOnInit() {
    this.productos$ = this.searchControl
      .valueChanges
      .startWith(null)
      .switchMap( term => this.lookupProductos(term));

    this.prepareControl();
  }

  private prepareControl() {
    this.subscription = this.searchControl
      .valueChanges
      .skip(1)
      .filter( value => value !== null)
      .subscribe( value => {
        if( _.isObject(value)) {
          this.onChange(value);
        } else {
          // this.onChange(null);
        }
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  lookupProductos(term: string): Observable<Producto[]> {
    let params = new HttpParams()
      .set('term', term);
    if (this.activos === true) {
      params = params.set('activos','activos')
    }
    return this.http.get<Producto[]>(this.apiUrl, {params: params});
  }

  displayFn(producto: Producto) {
    return producto ? `${producto.descripcion} (${producto.clave})` : '';
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
