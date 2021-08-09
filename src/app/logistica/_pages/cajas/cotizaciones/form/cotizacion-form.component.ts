import {
    Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef,
    OnChanges, SimpleChanges, ViewChild
  } from '@angular/core';
  import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
  import { Observable } from 'rxjs/Observable';
  import { Subscription } from 'rxjs/Subscription';

  import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
  import * as _ from 'lodash';

  import { Router } from '@angular/router';

  import { Sucursal } from 'app/models';
  import { CotizacionCaja } from '../../../../../models/cotizacionCaja';
  import { Producto } from '../../../../../models/producto';
  import { CajasService } from '../../../../services/cajas/cajas.service';
  import { ConfigService } from '../../../../../core/services/config.service';
  import { combineLatest } from 'rxjs/observable/combineLatest';



  @Component({
    selector: 'sx-cotizacion-form',
    templateUrl: 'cotizacion-form.component.html',
    styleUrls: [ './cotizacion-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CotizacionFormComponent implements OnInit, OnChanges {

    form: FormGroup;

    sucursal: Sucursal;

    formInvalid = true;

    // @Input() sucursal: Sucursal;

    @Output() save = new EventEmitter<CotizacionCaja>();

    @Input() disabled =  false;

    @Output() delete = new EventEmitter<CotizacionCaja>();

    producto$: Observable<Producto>;

    combinedObservers$: Observable<any>;

    precioEspObserver$: Observable<any>;

    @ViewChild('productField')
    private productField;

    precioCont = 0;

    precioCre = 0;

    precioEspCont = 0;

    precioEspCre = 0;


    constructor(
        private fb: FormBuilder,
        public dialog: MdDialog,
        private cd: ChangeDetectorRef,
        private service: CajasService,
        private router: Router,
        private configService: ConfigService
    ) {}

    ngOnInit() {
        this.sucursal = this.configService.getCurrentSucursal();
        this.buildForm();

        this.combinedObservers$ = combineLatest(
          this.form.get('producto').valueChanges,
          this.form.get('metrosLineales').valueChanges,
          this.form.get('piezas').valueChanges
          )
          this.combinedObservers$.subscribe(() => {
            this.calcular()
            this.validar()
          })

          this.precioEspObserver$ = combineLatest(
            this.form.get('precioPiezaConEsp').valueChanges,
            this.form.get('precioPiezaCreEsp').valueChanges
          )

          this.form.get('precioPiezaConEsp').valueChanges.subscribe(data =>{
            this.precioEspCont = data;
            if (!data) {
              this.precioEspCont = 0;
            }
            this.validar();
          })

          this.form.get('precioPiezaCreEsp').valueChanges.subscribe(data => {
            this.precioEspCre = data;
            if (!data) {
              this.precioEspCre = 0;
            }
            this.validar();
          })

        /* this.form.valueChanges.distinctUntilChanged().subscribe(change => {
          if (this.producto && this.metrosLineales && this.piezas) {
            console.log('Se debe estar calculando');
          }
        }) */

    }

    buildForm() {
        this.form = this.fb.group({
          id: [null],
          producto: [null, Validators.required],
          metrosLineales: [null, Validators.required],
          claveCaja: [null, Validators.required],
          descripcionCaja: [null, Validators.required],
          precioPiezaContado: [{value: null, disabled: true}, Validators.required],
          precioPiezaCredito: [{value: null, disabled: true}, Validators.required],
          precioPiezaConEsp: [null],
          precioPiezaCreEsp: [null],
          ancho: [null, Validators.required],
          kilos: [null, Validators.required],
          gramos: [null, Validators.required],
          largo: [null, Validators.required],
          altura: [null, Validators.required],
          resistenciaECT: [null, Validators.required],
          flauta: [null, Validators.required],
          piezas: [null, Validators.required],
        });
    }

    ngOnChanges(changes) {
      console.log(changes)
    }

    onSubmit() {
      const res = {
              ...this.form.value,
              claveCaja: this.form.get('claveCaja').value.toUpperCase(),
              descripcionCaja: this.form.get('descripcionCaja').value.toUpperCase(),
              precioPiezaContado: this.producto.precioContado * this.metrosLineales / this.piezas,
              precioPiezaCredito: this.producto.precioCredito * this.metrosLineales / this.piezas,
              precioEspecialContado: this.precioEspCont,
              precioEspecialCredito: this.precioEspCre,
              kilos: this.form.get('kilos').value,
              gramos: this.form.get('gramos').value,
              productoClave: this.producto.clave,
              productoDescripcion: this.producto.descripcion,
              productoPrecioContado: this.producto.precioContado,
              productoPrecioCredito: this.producto.precioCredito,
              sucursal: this.sucursal
            };
      this.service.save(res).subscribe(data => {
        this.router.navigate(['/logistica/cajas/cotizaciones']);
      }
      );
    }

    onCerrar() {

    }

    calcular() {
      this.precioCont = this.producto.precioContado * this.metrosLineales / this.piezas
      this.precioCre = this.producto.precioCredito * this.metrosLineales / this.piezas
      this.form.get('precioPiezaContado').setValue(this.precioCont.toFixed(2));
      this.form.get('precioPiezaCredito').setValue(this.precioCre.toFixed(2));

      if ( !this.form.invalid ) {
          this.formInvalid = false;
      }

    }

    validar() {
      console.log('Validando el formulario');
      console.log(this.precioEspCre)
      console.log(this.precioEspCont)

      if (this.precioEspCont !== 0 ) {

          console.log('Se debe validar contra el precio calculado')

          if (this.precioEspCont < this.precioCont) {
            console.log('Este pedido no procede por el precio especial de contado');
            this.formInvalid = true;
            return
          }
      }

      if ( this.precioEspCre !== 0) {

        console.log('Se debe validar contra el precio calculado')

          if (this.precioEspCre < this.precioCre) {
            console.log('Este pedido no procede por el precio especial de credito');
            this.formInvalid = true;
            return
          }

      }
      this.formInvalid = false;
    }

    get producto() {
      return this.form.get('producto').value;
    }

    get piezas(){
      return this.form.get('piezas').value;
    }
    get metrosLineales(){
      return this.form.get('metrosLineales').value;
    }

    get precioPiezaCredito(){
      return console.log(this.form.get('precioPiezaCredito').value)
    }

    get precioPiezaContado(){
      return console.log(this.form.get('precioPiezaContado').value)
    }



}
