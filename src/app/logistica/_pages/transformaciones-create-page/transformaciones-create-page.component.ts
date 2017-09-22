import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Transformacion } from "app/logistica/models/transformacion";
import { TransformacionesService } from "app/logistica/services/transformaciones/transformaciones.service";


@Component({
  selector: 'app-transformaciones-create-page',
  templateUrl: './transformaciones-create-page.component.html',
  styleUrls: ['./transformaciones-create-page.component.scss']
})
export class TransformacionesCreatePageComponent implements OnInit {

  
  constructor(
    private service: TransformacionesService,
    private router: Router
  ) { }

  ngOnInit() {}

  onSave(transformacion: Transformacion){
    console.log('Salvando entidad: ', transformacion);
    this.service.save(transformacion)
      .subscribe(value => {
        console.log('SAVE OK: ', value);
        this.router.navigate(['/logistica/inventarios/transformaciones/']);
      }, response => {
        console.log('Error salvando entidad: ', response);
      });
  }

  onCancel() {
    this.router.navigate(['/logistica/inventarios/transformaciones/']);
  }

  

}
