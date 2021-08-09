import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { GastoComponent } from './gasto/gasto.component';
import { RembolsoComponent } from './rembolso/rembolso.component';
import { FondoFijoService } from 'app/caja/services/fondo-fijo.service';
import { FondoFijo } from 'app/caja/models/fondoFijo';
import { TdDialogService } from '@covalent/core';
import { SelectorFechaComponent } from 'app/shared/_components/selector-fecha/selector-fecha.component';



@Component({
  selector: 'sx-corte-fondo-fijo',
  templateUrl: './corte-fondo-fijo.component.html',
  styleUrls: ['./corte-fondo-fijo.component.scss']
})
export class CorteFondoFijoComponent implements OnInit, OnDestroy {

  movimientos: FondoFijo[] = [];

  selected: FondoFijo[] = [];

  procesando = false;

  fecha = new Date()

  private _pendientes = false;

  constructor(
    public dialog: MdDialog,
    private service: FondoFijoService,
    private dialogService: TdDialogService,
    private router: Router
  ) { }

  ngOnInit() {
    const params =  JSON.parse(localStorage.getItem('caja_fondo_fijo')) || {pendientes: false};
    this._pendientes = params.pendientes;
    this.load();
  }
  
  ngOnDestroy() {
    const params = {pendientes: this._pendientes};
    localStorage.setItem('caja_fondo_fijo', JSON.stringify(params));
  }

  load() {
    this.procesando = true;
    if (this._pendientes) {
      this.service.pendientes()
      .finally( () => this.procesando = false)
      .subscribe(movimientos => {
        this.movimientos = movimientos
        this.selected = [];
      } , error => console.error(error));

    } else {
      this.service.list(this.fecha)
      .finally( () => this.procesando = false)
      .subscribe(movimientos => {
        this.movimientos = movimientos
        this.selected = [];
      } , error => console.error(error));
    }
  }

  gasto() {
    const params = {}
    this.openDialog(GastoComponent, params);
  }

  rembolso() {
    
    this.service
      .prepararRembolso()
      .subscribe( r => {
        const params = {rembolso: r}
        this.openDialog(RembolsoComponent, params);
      });
  }

  openDialog(component, params: {} = {}) {
    const dialogRef = this.dialog.open(component, {
      data: params
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(fondo) {
    console.log('Salvando fondo de caja: ', fondo);
    this.service.save(fondo).subscribe( fondo => {
      console.log('Registro de movimiento en fondo fijo exitosamente salvado: ', fondo);
      this.load();
    }, error => console.error('Error salvando fondo ', error));
  }

  solicitar() {
    console.log('Solicitando rembolso de: ', this.selectedGastos);
    if (this.selectedGastos.length === 0) {
      return;
    }
    this.dialogService.openConfirm({
      message: 'Solicitar rembolso de ' + this.selectedGastos.length + ' gastos',
      title: 'Rembolso de fondo fijo',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar'
    }).afterClosed().subscribe( val => {
      if (val) {
        this.doSolicitarRembolso();
      }
    });
  }

  private doSolicitarRembolso() {
    this.procesando = true;
    this.service
    .solicitarRembolso(this.selectedGastos)
    .delay(1000)
    .finally( () => this.procesando = false)
    .subscribe( res => {
      this.load();
      console.log("Rembolso solicitado...");
    });
  }

  cambiarFecha(fecha) {
    const dialogRef = this.dialog.open(SelectorFechaComponent, {
      data: this.fecha
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fecha = result;
        console.log('Nueva fecha: ', result);
        this.load();
      }
    });
  }

  hasSelection() {
    return this.selected.length == 0
  }
  
  get selectedGastos() {
    return this.selected
    .filter( item =>  (!item.rembolso && !item.solicitado) );
    
  }

  get pendientes() {
    return this._pendientes;
  }
  set pendientes(val) {
    this._pendientes = val;
    this.load();
  }

  onEdit(fondo: FondoFijo){
    console.log('Editando fondo fijo: ', fondo);
    this.router.navigate(['/caja/cortes/fondoFijo/edit/', fondo.id]);
  }

}
