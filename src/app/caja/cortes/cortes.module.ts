import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CortesPageComponent } from './cortes-page/cortes-page.component';
import { CorteCobranzaComponent } from './corte-cobranza/corte-cobranza.component';
import { CorteFondoFijoComponent } from './corte-fondo-fijo/corte-fondo-fijo.component';
import { CorteMorrallaComponent } from './corte-morralla/corte-morralla.component';
import { EfectivoDialogComponent } from './corte-cobranza/efectivo-dialog/efectivo-dialog.component';
import { ChequeDialogComponent } from './corte-cobranza/cheque-dialog/cheque-dialog.component';
import { TarjetaDialogComponent } from './corte-cobranza/tarjeta-dialog/tarjeta-dialog.component';
import { DepositoDialogComponent } from './corte-cobranza/deposito-dialog/deposito-dialog.component';
import { CambioDeChequeDialogComponent } from './corte-cobranza/cambio-de-cheque-dialog/cambio-de-cheque-dialog.component';
import { CorteCobranzaListComponent } from './corte-cobranza/corte-cobranza-list/corte-cobranza-list.component';
import { FondoFijoListComponent } from './corte-fondo-fijo/fondo-fijo-list/fondo-fijo-list.component';
import { RembolsoComponent } from './corte-fondo-fijo/rembolso/rembolso.component';
import { GastoComponent } from './corte-fondo-fijo/gasto/gasto.component';
import { MorrallaDialogComponent } from './corte-morralla/morralla-dialog/morralla-dialog.component';
import { MorrallaListComponent } from './corte-morralla/morralla-list/morralla-list.component';
import { FichasPageComponent } from './fichas-page/fichas-page.component';
import { FondoFijoEditComponent } from './corte-fondo-fijo/fondo-fijo-edit/fondo-fijo-edit.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [CortesPageComponent, CorteCobranzaComponent, CorteFondoFijoComponent,
    CorteMorrallaComponent,
    EfectivoDialogComponent,
    ChequeDialogComponent,
    TarjetaDialogComponent,
    DepositoDialogComponent,
    CambioDeChequeDialogComponent,
    CorteCobranzaListComponent,
    FondoFijoListComponent,
    RembolsoComponent,
    GastoComponent,
    MorrallaDialogComponent,
    MorrallaListComponent,
    FichasPageComponent,
    FondoFijoEditComponent,
  ],
  entryComponents: [
    EfectivoDialogComponent,
    ChequeDialogComponent,
    TarjetaDialogComponent,
    DepositoDialogComponent,
    CambioDeChequeDialogComponent,
    RembolsoComponent,
    GastoComponent,
    MorrallaDialogComponent
  ]
})
export class CortesModule { }
