import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef,
  OnChanges, SimpleChanges, ViewChild
} from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

import { Router, ActivatedRoute } from '@angular/router';

import { Sucursal } from 'app/models';
import { CotizacionCaja } from '../../../../../models/cotizacionCaja';
import { Producto } from '../../../../../models/producto';
import { CajasService } from '../../../../services/cajas/cajas.service';
import { ConfigService } from '../../../../../core/services/config.service';
import { combineLatest } from 'rxjs/observable/combineLatest';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);

@Component({
  selector: 'sx-cotizacion-show',
  templateUrl: './cotizacion-show.component.html',
  styleUrls: [ './cotizacion-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CotizacionShowComponent implements OnInit {

  form: FormGroup;

  cotizacion$: Observable<CotizacionCaja>;

  cotizacionCaja: CotizacionCaja;

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private service: CajasService,
    private router: Router,
    private route: ActivatedRoute,
    private configService: ConfigService
  ) {}

  ngOnInit() {
      this.cotizacion$ = this.route.paramMap.switchMap(params =>
      this.service.get(params.get('id'))
      );
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      producto: [{value: null, disabled: true}],
      metrosLineales: [{value: null, disabled: true}],
      claveCaja: [{value: null, disabled: true}],
      descripcionCaja: [{value: null, disabled: true}],
      precioPiezaContado: [{value: null, disabled: true}],
      precioPiezaCredito: [{value: null, disabled: true}],
      ancho: [{value: null, disabled: true}],
      largo: [{value: null, disabled: true}],
      alto: [{value: null, disabled: true}],
      resistenciaECT: [{value: null, disabled: true}],
      flauta: [{value: null, disabled: true}],
      piezas: [{value: null, disabled: true}],
      precioPiezaContEsp: [{value: null, disabled: true}, Validators.required],
      precioPiezaCreEsp: [{value: null, disabled: true}, Validators.required],
      kilos: [null, Validators.required],
    });
}




}
