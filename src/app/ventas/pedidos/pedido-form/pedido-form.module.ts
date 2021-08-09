import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import {
  PedidoFormComponent,
  PedidoEnvioPanelComponent,
  PedidoCargosPanelComponent,
  PedidoTotalesPanelComponent,
  PedidoToolbarComponent,
  PedidoHeaderComponent,
  PedidoComentarioPanelComponent
} from '.';
import { PartidasGridComponent } from './partidas-grid/partidas-grid.component';
import { PedidoFormService } from './pedido-form.service';
import { TipoFieldComponent } from './tipo-field/tipo-field.component';
import { ModoFieldComponent } from './modo-field/modo-field.component';
import { CompradorFieldComponent } from './comprador-field/comprador-field.component';
import { PedidoDetFormComponent } from './pedido-det-form/pedido-det-form.component';
import { DolaresFormComponent } from './dolares-form/dolares-form.component';
import { PedidoDolaresFormServiceService } from './dolares-form/pedido-dolares-form-service.service';
import { AnticipoFormComponent } from './anticipo-form/anticipo-form.component';
import { UsoCfdiComponent } from './uso-cfdi/uso-cfdi.component';
import { DescuentoEspecialComponent } from './descuento-especial/descuento-especial.component';
import { PrecioEspecialComponent } from './precio-especial/precio-especial.component';
import { EnvioDireccionComponent } from './envio-direccion/envio-direccion.component';
import { ValidationPanelComponent } from './validation-panel/validation-panel.component';
import { ConfiguracionValeComponent } from './configuracion-vale/configuracion-vale.component';
import { SocioFieldComponent } from './socio-field/socio-field.component';
import { PendientePorClienteDialogComponent } from './pendiente-por-cliente-dialog/pendiente-por-cliente-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([])],
  exports: [PedidoFormComponent, DolaresFormComponent, AnticipoFormComponent],
  declarations: [
    PedidoFormComponent,
    PedidoEnvioPanelComponent,
    PedidoCargosPanelComponent,
    PedidoTotalesPanelComponent,
    PedidoToolbarComponent,
    PedidoHeaderComponent,
    PedidoComentarioPanelComponent,
    PartidasGridComponent,
    TipoFieldComponent,
    ModoFieldComponent,
    CompradorFieldComponent,
    PedidoDetFormComponent,
    DolaresFormComponent,
    AnticipoFormComponent,
    UsoCfdiComponent,
    DescuentoEspecialComponent,
    PrecioEspecialComponent,
    EnvioDireccionComponent,
    ValidationPanelComponent,
    ConfiguracionValeComponent,
    SocioFieldComponent,
    PendientePorClienteDialogComponent
  ],
  entryComponents: [
    PedidoDetFormComponent,
    DescuentoEspecialComponent,
    PrecioEspecialComponent,
    EnvioDireccionComponent,
    PendientePorClienteDialogComponent
  ],
  providers: [PedidoFormService, PedidoDolaresFormServiceService]
})
export class PedidoFormModule {}
