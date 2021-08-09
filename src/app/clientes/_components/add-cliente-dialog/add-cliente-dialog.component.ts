import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import * as _ from 'lodash';

import { ClienteService } from 'app/clientes/services/cliente.service';
import { Cliente } from '@siipapx/models';

@Component({
  selector: 'sx-add-cliente-dialog',
  templateUrl: './add-cliente-dialog.component.html',
  styleUrls: ['./add-cliente-dialog.component.css']
})
export class AddClienteDialogComponent implements OnInit {
  form: FormGroup;

  colonias: any[] = [];

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<AddClienteDialogComponent>,
    private fb: FormBuilder,
    private service: ClienteService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: [null, [Validators.required, Validators.maxLength(255)]],
      rfc: [
        null,
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13)
        ],
        [this.validarRfc.bind(this)]
      ],
      clave: ['PENDIENTE', Validators.required],
      email: [null, Validators.required],
      direccion: this.fb.group({
        calle: [null, Validators.required],
        numeroExterior: [null, Validators.required],
        numeroInterior: [null],
        colonia: [null, ],
        municipio: [null, Validators.required],
        estado: [null, Validators.required],
        pais: [{ value: 'MEXICO', disabled: true }, Validators.required],
        codigoPostal: [null, Validators.required]
      }),
      telefono1: [null],
      telefono2: [null],
      celular: [null],
      fax: [null],
      mail: [null],
      www: [null]
    });
    /*
    const direccionGroup = this.form.get('direccion') as FormGroup;
    console.log('Dirección: ', direccionGroup);

    direccionGroup.get('codigoPostal').valueChanges.subscribe(cp => {
      console.log('CP: ', cp);
      const params = new HttpParams().set('zip_code', cp);
      this.http
        .get('http://sepomex.icalialabs.com/api/v1/zip_codes', {
          params: params
        })
        .map((response: any) => response.zip_codes)
        .subscribe((registros: any[]) => {
          const estado = _.map(registros, item => item.d_estado)[0];
          const municipio = _.map(registros, item => item.d_mnpio)[0];
          direccionGroup.get('estado').setValue(estado);
          direccionGroup.get('municipio').setValue(municipio);
          const colonias = _.map(registros, item => item.d_asenta);
          this.colonias = colonias;
          // console.log('Registros: ', registros);
          // console.log('Colonias: ', colonias);
        });
    });
    */
  }

  cancelar() {
    this.dialogRef.close('CANCELADO');
  }

  onSubmit() {
    if (this.form.valid) {
      const cliente = {
        medios: this.buildMediosObject(),
        ...this.form.getRawValue()
      };
      // console.log('Cliente: ', cliente);
      this.dialogRef.close(cliente);
    }
  }

  private buildMediosObject(): Array<any> {
    const medios = [];
    const telefono1 = this.form.get('telefono1').value;
    const telefono2 = this.form.get('telefono2').value;
    const cfdiMail = this.form.get('email').value;
    if (telefono1) {
      medios.push({
        tipo: 'TEL',
        descripcion: telefono1,
        comentario: 'TELEFONO 1'
      });
    }
    if (telefono2) {
      medios.push({
        tipo: 'TEL',
        descripcion: telefono2,
        comentario: 'TELEFONO 2'
      });
    }
    if (cfdiMail) {
      medios.push({
        tipo: 'MAIL',
        descripcion: cfdiMail,
        comentario: 'CFDI Mail',
        cfdi: true
      });
    }
    return medios;
  }

  get generalesLabel() {
    return this.form.get('nombre').value
      ? this.form.get('nombre').value
      : 'Datos generales';
  }

  get direccion() {
    return this.form.get('direccion').value;
  }

  reset() {
    this.form.reset();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.code === 'F7') {
      console.log('Interceptando F7');
    }
  }

  validarRfc(control: AbstractControl) {
    return this.service.validarRfc(control.value).map((cliente: Cliente) => {
      console.log('Cliente existente: ', cliente);
      return cliente && cliente.folioRFC !== 1 ? null : { rfcDuplicado: true };
    });
  }
}
