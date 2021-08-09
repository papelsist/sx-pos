import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AnticiposService } from 'app/caja/services/anticipos.service';
import { Cobro } from 'app/models/cobro';

@Component({
  selector: 'sx-anticipo-create',
  template: `
  <div >
    <ng-template tdLoading [tdLoadingUntil]="!procesando" tdLoadingStrategy="overlay" >
      <sx-anticipo-form (cancel)="onCancel()" (save)="onSave($event)"></sx-anticipo-form>

    </ng-template>
  </div>
  `
})
export class AnticipoCreateComponent implements OnInit {
  procesando = false;
  constructor(private router: Router, private service: AnticiposService) {}

  ngOnInit() {}

  onCancel() {
    this.router.navigate(['/ingresos/cobros']);
  }

  onSave(cobro: Cobro) {
    console.log('Salvando anticipo....', cobro);
    this.procesando = true;
    this.service
      .save(cobro)
      .finally(() => (this.procesando = false))
      .catch(err => Observable.of(err))
      .subscribe(res => this.router.navigate(['/caja/anticipos']));
  }
}
