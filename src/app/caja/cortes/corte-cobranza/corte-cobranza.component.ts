import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { EfectivoDialogComponent } from './efectivo-dialog/efectivo-dialog.component';
import { CambioDeChequeDialogComponent } from './cambio-de-cheque-dialog/cambio-de-cheque-dialog.component';
import { DepositoDialogComponent } from './deposito-dialog/deposito-dialog.component';
import { TarjetaDialogComponent } from './tarjeta-dialog/tarjeta-dialog.component';
import { ChequeDialogComponent } from './cheque-dialog/cheque-dialog.component';
import { CorteCobranzaService } from 'app/caja/services/corteCobranza.service';
import { CorteCobranza } from 'app/caja/models/corteCobranza';
import { SelectorFechaComponent } from '@siipapx/shared/_components/selector-fecha/selector-fecha.component';

@Component({
  selector: 'sx-corte-cobranza',
  templateUrl: './corte-cobranza.component.html',
  styleUrls: ['./corte-cobranza.component.scss']
})
export class CorteCobranzaComponent implements OnInit {

  cortes: CorteCobranza[] = [];

  fecha = new Date();

  procesando = false;

  constructor(
    public dialog: MdDialog,
    private service: CorteCobranzaService
  ) {
    
   }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.list(this.fecha).subscribe(cortes => {
      this.cortes = cortes
    } , error => console.error(error));
  }

  efectivo() {
    this.service
      .prepararCorte('EFECTIVO', 'CON', this.fecha)
      .do( () => this.procesando = true)
      .delay(1000)
      .finally( () => this.procesando = false)
      .subscribe( corte => {
        console.log('Corte preparado: ', corte)
        this.openDialog(EfectivoDialogComponent, corte);
      } );
  }

  cheques(tipo: string) {
    
    this.service
      .prepararCorte('CHEQUE', tipo, this.fecha)
      .combineLatest( this.service.corteChequeInfo('CHEQUE', tipo, this.fecha))
      .do( () => this.procesando = true)
      .delay(1000)
      .finally( () => this.procesando = false)
      .subscribe( corte => {
        console.log('Corte preparado: ', corte)
        this.openDialog(ChequeDialogComponent, corte);
      } );
  }


  tarjeta() {
    this.service
      .prepararCorte('TARJETA', 'CON', this.fecha)
      .do( () => this.procesando = true)
      .delay(1000)
      .finally( () => this.procesando = false)
      .subscribe( corte => {
        console.log('Corte preparado: ', corte)
        this.openDialog(TarjetaDialogComponent, corte)
      } );
  }

  depositos(tipo: string) {
    this.service
      .prepararCorte('DEPOSITO', tipo, this.fecha)
      .do( () => this.procesando = true)
      .delay(1000)
      .finally( () => this.procesando = false)
      .subscribe( corte => {
        console.log('Corte preparado: ', corte);
        this.openDialog(DepositoDialogComponent, corte);
      } );
  }

  transferencia(tipo: string) {
    this.service
      .prepararCorte('TRANSFERENCIA', tipo, this.fecha)
      .do( () => this.procesando = true)
      .delay(1000)
      .finally( () => this.procesando = false)
      .subscribe( corte => {
        this.openDialog(DepositoDialogComponent, corte);
      } );
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

  save(corte) {
    corte.fecha = this.fecha.toISOString()
    console.log('Salvando corte de caja: ', corte);
    this.service.save(corte).subscribe( corte => {
      console.log('Corte exitosamente salvado: ', corte);
      this.load();
    }, error => console.error('Error salvando corte ', error));
  }


  cambioDeCheque() {
    const dialogRef = this.dialog.open(CambioDeChequeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doSaveCambioDeCheque(result);
      }
    });
  }

  doSaveCambioDeCheque(cambio) {
    console.log('Salvando cambio de cheque: ', cambio);
    this.service.cambioDeCheque(cambio).subscribe( cobro => {
      console.log('Cambio de cheque exitosamente salvado: ', cobro);
    }, error => console.error('Error salvando cambio de cheque ', error));
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


}
