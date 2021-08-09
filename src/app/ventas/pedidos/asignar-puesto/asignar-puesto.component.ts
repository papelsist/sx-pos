import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sx-asignar-puesto',
  template: `
    <form
      [formGroup]="form"
      novalidate
      (ngSubmit)="doAccept()"
      [style.width.px]="600"
    >
      <h4 md-dialog-title>
        Asignar pedido como PUESTO
      </h4>
      <div layout="column">
        <sx-usuario-sec-field
          placeholder="Usuario"
          (usuarioFound)="setUsuario($event)"
        >
        </sx-usuario-sec-field>

        <md-form-field class="fill">
          <input
            type="text"
            mdInput
            placeholder=""
            value="{{ form.get('usuario').value?.username }}"
            [disabled]="true"
          />
        </md-form-field>
      </div>

      <md-dialog-actions>
        <button
          md-button
          class="accent"
          type="submit"
          [disabled]="form.invalid"
        >
          Aceptar
        </button>
        <button md-button type="button" (click)="close()">Cancelar</button>
      </md-dialog-actions>
    </form>
  `,
  styles: ['.fill { width: 100%; }'],
})
export class AsignarPuestoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<AsignarPuestoComponent>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      usuario: [null, Validators.required],
    });
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      ...this.form.getRawValue(),
    };
    this.dialogRef.close(res);
  }

  setUsuario(usuario: any) {
    this.form.get('usuario').setValue(usuario);
  }
}
