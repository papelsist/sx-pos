import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'app/shared/shared.module';
import { PedidosService } from './services/pedidos.service';
import { PedidosPageComponent, PedidoCreateComponent } from '.';
import { PedidoFormModule } from './pedido-form/pedido-form.module';
import { ClientesModule } from 'app/clientes/clientes.module';
import { ProductosModule } from 'app/productos/productos.module';
import { reducers } from './store/reducers';
import { PendientesComponent } from './pendientes/pendientes.component';
import { PendientesListComponent } from './pendientes/pendientes-list/pendientes-list.component';
import { PedidoEditComponent } from './pedido-edit/pedido-edit.component';
import { PedidoDolaresCreateComponent } from './pedido-create/pedido-dolares-create.component';
import { PedidoDolaresEditComponent } from './pedido-edit/pedido-dolares-edit.component';
import { PedidoAnticipoCreateComponent } from './pedido-create/pedido-anticipo-create.component';
import { PedidoAnticipoEditComponent } from './pedido-edit/pedido-anticipo-edit.component';
import { FacturacionCreComponent } from './facturacion-cre/facturacion-cre.component';
import { FacturasCreListComponent } from './facturacion-cre/facturas-cre-list/facturas-cre-list.component';
import { FacturadosComponent } from './facturados/facturados.component';
import { FacturadosListComponent } from './facturados/facturados-list/facturados-list.component';
import { FacturaViewComponent } from './factura-view/factura-view.component';
import { FacViewTotalesComponent } from './factura-view/fac-view-totales/fac-view-totales.component';
import { FacViewHeaderComponent } from './factura-view/fac-view-header/fac-view-header.component';
import { FacViewPartidasComponent } from './factura-view/fac-view-partidas/fac-view-partidas.component';
import { FacturaSearchComponent } from './factura-search/factura-search.component';
import { FacturaSearchDialogComponent } from './factura-search/factura-search-dialog.component';
import { AutorizacionDeVentaComponent } from './autorizacion-de-venta/autorizacion-de-venta.component';
import { CambioDeClienteComponent } from './cambio-de-cliente/cambio-de-cliente.component';
import { ComplementosComponent } from 'app/ventas/pedidos/complementos/complementos.component';
import { ComplementosService } from 'app/ventas/pedidos/services/complementos.service';
import { ComplementoComponent } from 'app/ventas/pedidos/complemento/complemento.component';
import { ComplementoFormComponent } from 'app/ventas/pedidos/complemento-form/complemento-form.component';
import { AsignarPuestoComponent } from './asignar-puesto/asignar-puesto.component';

@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    ProductosModule,
    PedidoFormModule,
    RouterModule.forChild([]),
    StoreModule.forFeature('pedidos', reducers),
  ],
  declarations: [
    PedidosPageComponent,
    PedidoCreateComponent,
    PendientesComponent,
    PendientesListComponent,
    PedidoEditComponent,
    PedidoDolaresCreateComponent,
    PedidoDolaresEditComponent,
    PedidoAnticipoCreateComponent,
    PedidoAnticipoEditComponent,
    FacturacionCreComponent,
    FacturasCreListComponent,
    FacturadosComponent,
    FacturadosListComponent,
    FacturaViewComponent,
    FacViewTotalesComponent,
    FacViewHeaderComponent,
    FacViewPartidasComponent,
    FacturaSearchComponent,
    FacturaSearchDialogComponent,
    AutorizacionDeVentaComponent,
    CambioDeClienteComponent,
    ComplementosComponent,
    ComplementoComponent,
    ComplementoFormComponent,
    AsignarPuestoComponent,
  ],
  providers: [PedidosService, ComplementosService],
  exports: [RouterModule, PendientesListComponent],
  entryComponents: [
    FacturaSearchDialogComponent,
    AutorizacionDeVentaComponent,
    CambioDeClienteComponent,
    AsignarPuestoComponent,
  ],
})
export class PedidosModule {}
