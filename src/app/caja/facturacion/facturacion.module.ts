import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PendientesPageComponent } from './pendientes-page/pendientes-page.component';
import { CobroComponent } from './cobro/cobro.component';
import { CobroFormComponent } from './cobro/cobro-form/cobro-form.component';
import { GeneradasPageComponent } from './generadas-page/generadas-page.component';
import { CobranzaCodComponent } from './cobranza-cod/cobranza-cod.component';
import { CobroCodFormComponent } from './cobranza-cod/cobro-cod-form/cobro-cod-form.component';
import { CobroCodComponent } from './cobranza-cod/cobro-cod/cobro-cod.component';
import { FacturaShowComponent } from './factura-show/factura-show.component';
import { FacShowHeaderComponent } from './factura-show/fac-show-header/fac-show-header.component';
import { FacShowPartidasComponent } from './factura-show/fac-show-partidas/fac-show-partidas.component';
import { FacShowTotalesComponent } from './factura-show/fac-show-totales/fac-show-totales.component';
import { ChequeFormComponent } from './cobro/cheque-form/cheque-form.component';
import { TarjetaFormComponent } from './cobro/tarjeta-form/tarjeta-form.component';
import { DisponibleFormComponent } from './cobro/disponible-form/disponible-form.component';
import { BonificacionesMCAddComponent } from './bonificaciones-mc-add/bonificaciones-mc-add.component';
import { PagoAnticipoComponent } from './pago-anticipo/pago-anticipo.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([])],
  declarations: [
    PendientesPageComponent,
    CobroComponent,
    CobroFormComponent,
    GeneradasPageComponent,
    CobranzaCodComponent,
    CobroCodFormComponent,
    CobroCodComponent,
    FacturaShowComponent,
    FacShowHeaderComponent,
    FacShowPartidasComponent,
    FacShowTotalesComponent,
    ChequeFormComponent,
    TarjetaFormComponent,
    DisponibleFormComponent,
    BonificacionesMCAddComponent,
    PagoAnticipoComponent,
  ],
  entryComponents: [
    ChequeFormComponent,
    TarjetaFormComponent,
    DisponibleFormComponent,
    PagoAnticipoComponent,
  ],
})
export class FacturacionModule {}
