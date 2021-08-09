import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaPageComponent } from './caja-page/caja-page.component';
import { MainPageComponent } from './_main-page/main-page.component';
import { ReportesService } from './services/reportes.service';
import { VentasDiariasComponent } from './reportes/ventas-diarias/ventas-diarias.component';
import { FacturacionModule } from './facturacion/facturacion.module';
import { CajaService } from './services/caja.service';
import { CobroService } from './services/cobro.service';
import { FichaService } from './services/ficha.service';

// Reportes
import { AplicacionSaldosComponent } from './reportes/aplicacion-saldos/aplicacion-saldos.component';
import { CobranzaCamionetaComponent } from './reportes/cobranza-camioneta/cobranza-camioneta.component';
import { CobranzaEfectivoComponent } from './reportes/cobranza-efectivo/cobranza-efectivo.component';
import { FacturasPendientesCODComponent } from './reportes/facturas-pendientes-cod/facturas-pendientes-cod.component';
import { FacturasCanceladasComponent } from './reportes/facturas-canceladas/facturas-canceladas.component';
import { FacturasCobradasComponent } from './reportes/facturas-cobradas/facturas-cobradas.component';
import { FacturasPendientesEmbarqueComponent } from './reportes/facturas-pendientes-embarque/facturas-pendientes-embarque.component';
import { DisponiblesSucursalComponent } from './reportes/disponibles-sucursal/disponibles-sucursal.component';
import { VentasDiariasCheComponent } from './reportes/ventas-diarias-che/ventas-diarias-che.component';
import { CortesModule } from './cortes/cortes.module';
import { CorteCobranzaService } from './services/corteCobranza.service';
import { FondoFijoService } from './services/fondo-fijo.service';
import { MorrallaService } from 'app/caja/services/morralla.service';
import { ArqueoComponent } from './reportes/arqueo/arqueo.component';
import { RelacionFichasComponent } from './reportes/relacion-fichas/relacion-fichas.component';
import { CajaGuard } from 'app/caja/services/caja.guard';
import { AnticiposComponent } from './anticipos/anticipos.component';
import { AnticiposTableComponent } from './anticipos/anticipos-table/anticipos-table.component';
import { AnticiposService } from 'app/caja/services/anticipos.service';
import { AnticipoCreateComponent } from './anticipos/anticipo-create/anticipo-create.component';
import { AnticipoFormComponent } from './anticipos/anticipo-form/anticipo-form.component';
import { AnticipoShowComponent } from './anticipos/anticipo-show/anticipo-show.component';
import { BonificacionesMCService } from './services/bonificacionesMC.service';

@NgModule({
  imports: [SharedModule, CajaRoutingModule, FacturacionModule, CortesModule],
  declarations: [
    MainPageComponent,
    CajaPageComponent,
    VentasDiariasComponent,
    AplicacionSaldosComponent,
    CobranzaCamionetaComponent,
    CobranzaEfectivoComponent,
    FacturasPendientesCODComponent,
    FacturasCobradasComponent,
    FacturasCanceladasComponent,
    FacturasPendientesEmbarqueComponent,
    DisponiblesSucursalComponent,
    VentasDiariasCheComponent,
    ArqueoComponent,
    RelacionFichasComponent,
    AnticiposComponent,
    AnticiposTableComponent,
    AnticipoCreateComponent,
    AnticipoFormComponent,
    AnticipoShowComponent
  ],
  providers: [
    ReportesService,
    CajaService,
    CobroService,
    CorteCobranzaService,
    FondoFijoService,
    MorrallaService,
    FichaService,
    CajaGuard,
    AnticiposService,
    BonificacionesMCService
  ],
  entryComponents: [
    VentasDiariasComponent,
    AplicacionSaldosComponent,
    CobranzaCamionetaComponent,
    CobranzaEfectivoComponent,
    FacturasPendientesCODComponent,
    FacturasCobradasComponent,
    FacturasCanceladasComponent,
    FacturasPendientesEmbarqueComponent,
    DisponiblesSucursalComponent,
    VentasDiariasCheComponent,
    ArqueoComponent,
    RelacionFichasComponent
  ]
})
export class CajaModule {}
