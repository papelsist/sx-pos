import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Sucursal } from '../../../models/sucursal';
import { ConfigService } from '../../../core/services/config.service';
import { SoporteService } from '../services/soporte.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sx-soporte-form',
  templateUrl: './soporte-form.component.html',
  styleUrls: ['./soporte-form.component.scss']
})
export class SoporteFormComponent implements OnInit {

  form: FormGroup;
  sucursal: Sucursal;
  modulo: FormControl;
  subscription: Subscription;
  modulos = ['CLIENTES', 'COBRANZA', 'INVENTARIOS', 'EMBARQUES', 'DEPOSITOS', 'USUARIOS', 'TRASLADOS',
              'VENTAS', 'PEDIDOS', 'CAJA', 'COMPRAS', 'CREDITO']
  tipos$: Observable<any>;

  constructor(private fb: FormBuilder, private configService: ConfigService, private soporteService: SoporteService,
              private router: Router) { }



  ngOnInit() {
    this.buildForm();
    this.sucursal = this.configService.getCurrentSucursal();
    console.log(this.sucursal)
    this.tipos$ = this.modulo.valueChanges.switchMap(evt => this.onChangeModulo(evt));
  }

  buildForm() {
    this.modulo = new FormControl();
    this.form = this.fb.group({
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      fecha: [new Date()],
      modulo: this.modulo,
      tipo: [],
      descripcion: [],
      comentario: [],
      documento: [],
      fechaDocumento: [],
      usuario: [null, Validators.required]
    });
  }

  onChangeModulo(modulo) {
    return this.soporteService.tipos(modulo);
  }

  onSubmit() {
    const sucursalId = this.sucursal.id;
    const res = {...this.form.value, sucursal: this.sucursal};
    this.soporteService.salvar(res).subscribe();
    this.router.navigate(['/ventas/pedidos/soporte'])
  }

  isEditable() {
    return true;
  }

  get fecha() {
    return this.form.get('fecha').value;
  }
  get solicita() {
    return this.form.get('usuario').value;
  }

  setAtendio(user) {
    this.form.get('usuario').setValue(user);
  }
}
