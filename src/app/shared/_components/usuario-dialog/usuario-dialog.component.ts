import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { User } from '@siipapx/_auth/models/user';

@Component({
  selector: 'sx-usuario-dialog',
  template: `
    <h4 md-dialog-title>{{data.title}}</h4>

    <div layout>
      <sx-usuario-sec-field placeholder="Usuario" (usuarioFound)="setUsuario($event)"></sx-usuario-sec-field>
    </div>
    <div layout>
      <md-form-field flex>
        <input type="text" mdInput placeholder="" value="{{user?.username}}" [disabled]="true">
      </md-form-field>
    </div>
    <md-dialog-actions>
      <button md-button class="accent" (click)="doAccept()" [disabled]="!user">Aceptar</button>
      <button md-button type="button" (click)="close()">Cancelar</button>
    </md-dialog-actions>
  `
})
export class UsuarioDialogComponent implements OnInit {
  user: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private dialogRef: MdDialogRef<UsuarioDialogComponent>
  ) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.user) {
      this.dialogRef.close(this.user);
    }
  }

  setUsuario(usuario: any) {
    this.user = usuario;
  }
}
