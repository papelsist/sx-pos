import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Venta } from '@siipapx/models';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sx-vale-automatico-dialog',
  templateUrl: './vale-automatico-dialog.component.html',
  styles: ['.fill { width: 100%; }'],
})
export class ValeAutomaticoDialogComponent implements OnInit {


  form: FormGroup
  title = 'Generacion de Vale por Venta';
  pedido: any;
  partidas$: Observable<any>;
  partidas: any;
  partidasPristine: any
  entity: any;
  subscription: Subscription


  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<ValeAutomaticoDialogComponent>,
    private fb: FormBuilder,
    private service: PedidosService
  ) {
    if (data.title) {
      this.title = data.title;
    }
  }

  buildForm() {
    this.form = this.fb.group({
      sucursalVale: [{value: this.pedido.sucursalVale.nombre, disabled: true}, ],
      comentario: [null],
      partidas: this.fb.array([])
    });
  }

  ngOnInit() {
    this.pedido = this.data.pedido;
    this.partidas$ = this.service
    .getPartidasVale(this.data.pedido.id)
    .catch(err => Observable.of([]));
    this.subscription = this.partidas$.subscribe((elements) => { this.partidasPristine = elements } )
    this.buildForm()
  }

  close() {
    this.dialogRef.close();
  }

  setUsuario(usuario: any) {
    this.form.get('usuario').setValue(usuario);
  }

  doAccept() {
    this.prepareEntity()
    this.dialogRef.close(this.entity);
  }

  actualizarPartidas(parts) {
      this.partidas = parts
  }

  prepareEntity() {

    if (!this.partidas) {
      this.partidas = this.partidasPristine
    }
    this.subscription.unsubscribe()

    this.entity = {
        id: this.pedido.id,
        cliente: this.pedido.cliente,
        tipo: this.pedido.tipo,
        documento: this.pedido.documento,
        sucursal: this.pedido.sucursal,
        sucursalVale: this.pedido.sucursalVale,
        clasificacionVale: this.pedido.clasificacionVale,
        venta: this.pedido.id,
        partidas: this.partidas,
        comentario: this.form.get('comentario').value,
        createUser: this.pedido.createUser,
        updateUser: this.pedido.updateUser
    }
  }
}

