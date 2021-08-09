import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent, MainDashboardComponent } from './_pages';
import { PedidosPageComponent, PedidoCreateComponent } from './pedidos';
import { PendientesComponent } from './pedidos/pendientes/pendientes.component';
import { PedidoEditComponent } from './pedidos/pedido-edit/pedido-edit.component';
import { SolicitudesPageComponent } from './solicitudes/solicitudes-page/solicitudes-page.component';
import { SolicitudCreateComponent } from './solicitudes/solicitud-create/solicitud-create.component';
import { SolicitudEditComponent } from './solicitudes/solicitud-edit/solicitud-edit.component';
import { PedidoDolaresCreateComponent } from './pedidos/pedido-create/pedido-dolares-create.component';
import { PedidoDolaresEditComponent } from './pedidos/pedido-edit/pedido-dolares-edit.component';
import { PedidoAnticipoEditComponent } from './pedidos/pedido-edit/pedido-anticipo-edit.component';
import { PedidoAnticipoCreateComponent } from './pedidos/pedido-create/pedido-anticipo-create.component';
import { FacturacionCreComponent } from './pedidos/facturacion-cre/facturacion-cre.component';
import { FacturadosComponent } from './pedidos/facturados/facturados.component';
import { FacturaViewComponent } from './pedidos/factura-view/factura-view.component';
import { CanceladasPageComponent } from 'app/ventas/canceladas/canceladas-page/canceladas-page.component';
import { ComplementosComponent } from 'app/ventas/pedidos/complementos/complementos.component';
import { ComplementoComponent } from 'app/ventas/pedidos/complemento/complemento.component';
import { SoportePageComponent } from './soporte/soporte-page/soporte-page.component';
import { SoporteCreateComponent } from './soporte/soporte-create/soporte-create.component';


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'pedidos',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: MainDashboardComponent
      },
      {
        path: 'pedidos',
        component: PedidosPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'pendientes',
            pathMatch: 'full'
          },
          {
            path: 'pendientes',
            component: PendientesComponent
          },
          {
            path: 'facturacionCredito',
            component: FacturacionCreComponent
          },
          {
            path: 'solicitudes',
            component: SolicitudesPageComponent
          },
          {
            path: 'solicitudes/create',
            component: SolicitudCreateComponent
          },
          {
            path: 'solicitudes/edit/:id',
            component: SolicitudEditComponent
          },
          {
            path: 'anticipo/create',
            component: PedidoAnticipoCreateComponent
          },
          {
            path: 'anticipo/edit/:id',
            component: PedidoAnticipoEditComponent
          },
          {
            path: 'facturados',
            component: FacturadosComponent
          },
          {
            path: 'facturados/show/:id',
            component: FacturaViewComponent
          },
          {
            path: 'canceladas',
            component: CanceladasPageComponent
          },
          {
            path: 'soporte',
            component: SoportePageComponent
          },
          {
            path: 'soporte/create',
            component: SoporteCreateComponent
          },
          {
            path: 'complementos',
            component: ComplementosComponent
          },
          {
            path: 'complementos/:id',
            component: ComplementoComponent
          },
        ]
      },
      {
        path: 'pedidos/create',
        component: PedidoCreateComponent
      },
      {
        path: 'pedidos/edit/:id',
        component: PedidoEditComponent
      },
      {
        path: 'pedidos/dolares/create',
        component: PedidoDolaresCreateComponent
      },
      {
        path: 'pedidos/dolares/edit/:id',
        component: PedidoDolaresEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule {}
