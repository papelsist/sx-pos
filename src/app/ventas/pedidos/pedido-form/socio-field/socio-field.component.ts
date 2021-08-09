import {Component, Input, OnInit, OnDestroy,
  forwardRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';


import { environment} from 'environments/environment';
import { ConfigService } from 'app/core/services/config.service';
import { Socio } from 'app/models/socio';

export const SOCIO_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => SocioFieldComponent),
  multi: true,
}

@Component({
  selector: 'sx-socio-field',
  providers: [SOCIO_LOOKUPFIELD_VALUE_ACCESSOR],
  templateUrl: './socio-field.component.html',
  styleUrls: ['./socio-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocioFieldComponent implements OnInit, ControlValueAccessor, OnDestroy {

  private apiUrl: string;

  searchControl = new FormControl();

  @Input() required = false;

  @Input() activos = true;

  @Input() placeholder = 'Seleccione un socio';

  socios$: Observable<Socio[]>;

  onChange;
  onTouch;
  subscription: Subscription;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('socios');
  }

  ngOnInit() {
    this.socios$ = this.searchControl
      .valueChanges
      .startWith(null)
      .switchMap( term => this.lookup(term));

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

  lookup(term: string): Observable<Socio[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<Socio[]>(this.apiUrl, {params: params});
  }

  displayFn(socio: Socio) {
    return socio ? `${socio.nombre}` : '';
  }

  writeValue(obj: any): void {
    this.searchControl.setValue(obj);
    if (obj === null) {
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
    if (this.onTouch) {
      this.onTouch();
    }
  }

}

