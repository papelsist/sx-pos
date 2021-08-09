import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { KardexService } from '@siipapx/logistica/services/kardex.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-validacion-conteo',
  templateUrl: './validacion-conteo.component.html',
  styles: [`
    .rec-form {
      width: 300px;
    }
  `]
})
export class ValidacionConteoComponent implements OnInit {

  form: FormGroup;

  filtros = ['TODOS', 'SIN DIFERENCIA', 'CON DIFERENCIA']
  ordenador = ['CLAVE', 'NOMBRE', 'DIFERENCIA ASC', 'DIFERENCIA DESC']
  activos = ['TODOS', 'ACTIVOS', 'INACTIVOS']
  isDeLinea = [ 'TODOS', 'DE LINEA', 'ESPECIALES']

  filteredOptions: Observable<string>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<ValidacionConteoComponent>,
    private service: KardexService
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      sectorIni: ['', Validators.required],
      sectorFin: ['', Validators.required],
      activo: ['TODOS'],
      deLinea: ['TODOS'],
      difDe: [-10000000, Validators.required],
      difA: [10000000, Validators.required],
      filtro: ['TODOS'],
      ordenado: ['CLAVE']

    });

  }


  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      sectorIni: this.form.value.sectorIni,
      sectorFin: this.form.value.sectorFin,
      activo: this.form.value.activo,
      deLinea: this.form.value.deLinea,
      difDe: this.form.value.difDe,
      difA: this.form.value.difA,
      filtro: this.form.value.filtro,
      ordenado: this.form.value.ordenado
    };
    this.dialogRef.close(res);
  }
}
