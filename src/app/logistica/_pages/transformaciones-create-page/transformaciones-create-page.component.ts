import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Transformacion } from "app/logistica/models/transformacion";
import { TransformacionesService } from "app/logistica/services/transformaciones/transformaciones.service";

import { Sucursal } from 'app/models';
import * as fromRoot from 'app/reducers';


@Component({
  selector: 'app-transformaciones-create-page',
  templateUrl: './transformaciones-create-page.component.html',
  styleUrls: ['./transformaciones-create-page.component.scss']
})
export class TransformacionesCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  
  constructor(
    private service: TransformacionesService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) { 
    this.sucursal$ = store.select(fromRoot.getSucursal);
  }

  ngOnInit() {}

  onSave(transformacion: Transformacion){
    this.service.save(transformacion)
      .subscribe( (trs: any) => {
        this.router.navigate(['/logistica/inventarios/transformaciones/show', trs.id]);
      }, response => {
        console.log('Error salvando entidad: ', response);
      });
  }

  onCancel() {
    this.router.navigate(['/logistica/inventarios/transformaciones/']);
  }

  

}
