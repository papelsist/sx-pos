import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { KardexService } from '@siipapx/logistica/services/kardex.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-rec-por-linea',
  templateUrl: './rec-por-linea.component.html',
  styles: [`
    .rec-form {
      width: 300px;
    }
  `]
})
export class RecPorLineaComponent implements OnInit {

  form: FormGroup;

  estados = ['TODOS', 'ACTIVOS', 'INACTIVOS'];
  tipos = ['TODOS', 'DELINEA', 'ESPECIALES'];
  existencia = ['TODOS', 'POSITIVOS', 'NEGATIVOS', 'EN_CERO'];
  clases: Array<any>;
  lineas: Array<any>;

  filteredOptions: Observable<string>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<RecPorLineaComponent>,
    private service: KardexService
  ) { }

  ngOnInit() {
    //this.service.getLineas().subscribe( data => this.lineas = data);
    //this.service.getClases().subscribe( data => this.clases = data);
    this.form = this.fb.group({
      tipo: ['TODOS', Validators.required],
      estado: ['ACTIVOS', Validators.required],
      existencia: ['TODOS', Validators.required],
      linea: [null],
      clase: [null]
    });
  
  }

  

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      tipo: this.form.value.tipo,
      estado: this.form.value.estado,
      existencia: this.form.value.existencia,
      linea: this.form.value.linea? this.form.value.linea.linea : null,
      clase: this.form.value.clase? this.form.value.clase.clase : null
    };
    this.dialogRef.close(res);
  }
}
