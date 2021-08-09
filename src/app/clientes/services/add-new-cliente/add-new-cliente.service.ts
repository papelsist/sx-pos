import { Injectable, ViewContainerRef } from '@angular/core';
import {MdDialog, MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

import { AddClienteDialogComponent } from 'app/clientes/_components/add-cliente-dialog/add-cliente-dialog.component';
import { ClienteService } from 'app/clientes/services/cliente.service';
import { TdDialogService } from '@covalent/core';

@Injectable()
export class AddNewClienteService {

  constructor(
    public dialog: MdDialog,
    private service: ClienteService,
    private _dialogService: TdDialogService,
    ) { }

  newCliente() {
    console.log('Registrando un nuevo cliente');
    const dialogRef = this.dialog.open(AddClienteDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(`Salvando cliente:`, result);
      this.service.save(result)
      .subscribe( cliente => this.showConfigmation(cliente));
    });
  }

  showConfigmation(cliente) {
    console.log('Cliente registrado: ', cliente);
    this._dialogService.openAlert({
      message: 'Cliente registrado ' + cliente.nombre,
      disableClose: true,
      title: 'Alta de cliente',
      closeButton: 'Cerrar',
    });
  }

  handleError(error){

  }

}
