import {Component, Input, OnInit, OnDestroy, 
  forwardRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

import { Chofer } from 'app/logistica/models/chofer';
import { ConfigService } from 'app/core/services/config.service';

export const CHOFERES_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => ChoferesFieldComponent),
  multi: true,
}

@Component({
  selector: 'sx-choferes-field',
  providers: [CHOFERES_LOOKUPFIELD_VALUE_ACCESSOR],
  templateUrl: './choferes-field.component.html',
  styleUrls: ['./choferes-field.component.scss']
})
export class ChoferesFieldComponent implements OnInit, ControlValueAccessor, OnDestroy  {

  private apiUrl: string; // + '/embarques/choferes';

  searchControl = new FormControl();

  @Input() required = false;

  @Input() activos: boolean = true;

  @Input() placeholder = "Seleccione un chofer";

  productos$: Observable<Chofer[]>;

  onChange;
  onTouch;
  subscription: Subscription;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('embarques/choferes');
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
          this.onChange(null);
        }
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  lookupProductos(term: string): Observable<Chofer[]> {
    let params = new HttpParams()
      .set('term', term);
    if (this.activos === true) {
      // params = params.set('activos','activos')
    }  
    return this.http.get<Chofer[]>(this.apiUrl, {params: params});
  }

  displayFn(producto: Chofer) {
    return producto ? producto.nombre : '';
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
