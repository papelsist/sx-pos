import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TdDialogService } from '@covalent/core';

import { AnticiposService } from 'app/caja/services/anticipos.service';
import { Cobro } from 'app/models/cobro';

@Component({
  selector: 'sx-anticipo-show',
  template: `
  <div >
    <ng-template tdLoading [tdLoadingUntil]="!procesando" tdLoadingStrategy="overlay" >
      <sx-anticipo-form (cancel)="onCancel()" [cobro]="anticipo"
        (delete)="onDelete($event)" (print)="print($event)"></sx-anticipo-form>
    </ng-template>
  </div>
  `
})
export class AnticipoShowComponent implements OnInit {
  procesando = false;
  anticipo: any;
  constructor(
    private router: Router,
    private service: AnticiposService,
    private route: ActivatedRoute,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.anticipo = this.route.snapshot.data.anticipo;
  }

  onCancel() {
    this.router.navigate(['/caja/anticipos']);
  }

  onDelete(cobro: Cobro) {
    this.dialogService
      .openConfirm({
        title: 'Eliminar cobro?',
        message: 'Cobro por: ' + cobro.importe,
        acceptButton: 'Eliminar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.procesando = true;
          this.service
            .delete(cobro.id)
            .finally(() => (this.procesando = false))
            .catch(err => Observable.of(err))
            .subscribe(data => {
              this.router.navigate(['/caja/anticipos']);
            });
        }
      });
  }

  print(anticipo) {
    this.procesando = true;
    this.service
      .print(anticipo.id)
      .finally(() => (this.procesando = false))
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          this.procesando = false;
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },
        error2 => console.error(error2)
      );
  }
}
