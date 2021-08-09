import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { FondoFijo } from 'app/caja/models/fondoFijo';
import { FondoFijoService } from 'app/caja/services/fondo-fijo.service';

@Component({
  selector: 'sx-fondo-fijo-edit',
  templateUrl: './fondo-fijo-edit.component.html',
  styles: []
})
export class FondoFijoEditComponent implements OnInit {

  form: FormGroup

  gasto$: Observable<FondoFijo>;

  gasto: FondoFijo;

  procesando = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: FondoFijoService,
  ) { 
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      documento: [null, Validators.required],
      descripcion: [null],
      comentario: [null, Validators.required],
      importe: [0.0, Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap
    .switchMap( params => 
      this.service
      .get(params.get('id'))
      .do( ()=> this.procesando = true)
      .catch( error => this.handleError(error))
      .finally( () => this.procesando = false)
    ).subscribe( gasto =>  {
      this.gasto = gasto;
      this.form.patchValue(gasto);
      this.form.get('importe').setValue(this.gasto.importe * -1 );
    });
  }

  onSubmit() {
    this.service.update(this.preparEntity())
      .do( ()=> this.procesando = true)
      .catch( error => this.handleError(error))
      .finally( () => this.procesando = false)
      .subscribe(res => this.router.navigate(['caja/cortes/fondoFijo'])
    );
  }

  private preparEntity(){
    const res = {...this.gasto, ...this.form.value}
    res.importe = this.form.get('importe').value * -1
    return res;
  }

  private handleError(error) {
    console.log('Error: ', error);
    return Observable.of(null);
  }

  cancelar() {
    this.router.navigate(['caja/cortes/fondoFijo'])
  }

}
