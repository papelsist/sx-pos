import { Component, OnInit, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { TdDialogService } from '@covalent/core';
import * as _ from 'lodash';

@Component({
  selector: 'sx-comprador-field',
  template: `
    <section >
      <md-checkbox checked="checked"  [formControl]="control" class="text-md">Mismo comprador</md-checkbox>
    </section>
  `,
  styles: [
    `
    .fill {
      width: 100%;
    }
    `]
})
export class CompradorFieldComponent implements OnInit, OnDestroy {

  @Input() parent: FormGroup;

  checked = true;

  control: FormControl;

  subscription: Subscription;

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.control = new FormControl(true);
    this.subscription = this.control.valueChanges.subscribe( value => {
      if(value) {
        this.limpiarComprador();
      } else {
        this.registrarComprador();
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private limpiarComprador() {
    this.parent.get('comprador').setValue(null);
  }

  private registrarComprador() {
    this._dialogService.openPrompt({
      message: 'Nombre del comprador.',
      viewContainerRef: this._viewContainerRef,
      title: 'Comprador',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        this.setComprador(newValue);
      } else {
        this.invalidComrador();
      }
    });
  }

  private invalidComrador(){
    this.control.setValue(true);
  }

  private setComprador(comprador: string) {
    if(comprador.length > 0) {
      this.parent.get('comprador').setValue(comprador);
    } else {
      this.invalidComrador();
    }

  }



}
