import {Component, Input, OnInit, OnDestroy, 
  forwardRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

import { ConfigService } from 'app/core/services/config.service';
import { Clase } from '../../../models/clase';

export const CLASES_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => ClasesFieldComponent),
  multi: true,
}

@Component({
  selector: 'sx-clases-field',
  providers: [CLASES_LOOKUPFIELD_VALUE_ACCESSOR],
  templateUrl: './clases-field.component.html',
  styleUrls: ['./clases-field.component.scss']
})
export class ClasesFieldComponent implements OnInit {

  private apiUrl: string;

  searchControl = new FormControl();

  @Input() required = false;

  @Input() activos: boolean = true;

  @Input() placeholder = "Clase";

  clases$: Observable<Clase[]>;

  onChange;
  onTouch;
  subscription: Subscription;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('clases');
   }

  ngOnInit() {
    this.clases$ = this.searchControl
      .valueChanges
      .startWith(null)
      .switchMap( term => this.lookupClases(term));

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

  lookupClases(term: string): Observable<Clase[]> {
    let params = new HttpParams()
      .set('term', term);
    if (this.activos === true) {
       params = params.set('activos','activos')
    }  
    return this.http.get<Clase[]>(this.apiUrl, {params: params});
  }

  displayFn(clase: Clase) {
    return clase ? clase.clase : '';
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
