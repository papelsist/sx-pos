import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as pages from './_pages/';
import { ExistenciaEditComponent } from './_pages/existencia-edit/existencia-edit.component';
import { ExistenciaResolve } from './_pages/existencia-edit/existencia.resover';
import { InvFacturasPageComponent } from 'app/logistica/_pages/inv-facturas-page/inv-facturas-page.component';
import { PuestosPageComponent } from './_pages/puestos-page/puestos-page.component';
import { CapturaMostradorPageComponent } from './_pages/almacen/captura/captura-mostrador-page-component';
import { CotizacionShowComponent } from './_pages/cajas/cotizaciones/form/cotizacion-show.component';





const routes: Routes = [
  {
    path: '',
    component: pages.MainPageComponent,
    children: [
      { path: '', redirectTo: 'inventarios', pathMatch: 'full'},
      {
        path: 'inventarios',
        component: pages.InventariosPageComponent,
        children: [
          { path: '', redirectTo: 'movimientos', pathMatch: 'full'},
          { path: 'movimientos', component: pages.MovimientosPageComponent},
          { path: 'movimientos/create', component: pages.MovimientosCreateComponent},
          { path: 'movimientos/show/:id', component: pages.MovimientosShowComponent},
          { path: 'existencias', component: pages.ExistenciasPageComponent},
          { path: 'existencias/edit/:id', component: ExistenciaEditComponent, resolve: {existencia: ExistenciaResolve}},
          { path: 'transformaciones', component: pages.TransformacionesPageComponent},
          { path: 'transformaciones/create', component: pages.TransformacionesCreatePageComponent},
          { path: 'transformaciones/show/:id', component: pages.TransformacionesShowPageComponent},
          { path: 'transformaciones/edit/:id', component: pages.TransformacionesEditPageComponent},
          // Devoluciones de venta
          { path: 'devoluciones', component: pages.DevolucionesVentaPageComponent},
          { path: 'devoluciones/create', component: pages.DevolucionCreatePageComponent},
          { path: 'devoluciones/show/:id', component: pages.DevolucionesShowPageComponent},

          // Devoluciones de compras
          { path: 'decs', component: pages.DecsPageComponent},
          { path: 'decs/show/:id', component: pages.DecShowPageComponent},
          { path: 'decs/create', component: pages.DecCreatePageComponent},

          // Kardex
          { path: 'kardex', component: pages.KardexPageComponent},
          { path: 'kardex/show/:id', component: pages.KardexViewPageComponent},
          { path: 'facturas', component: InvFacturasPageComponent},
          // Puestos
          { path: 'puestos', component: PuestosPageComponent }
        ]
      },
      {
        path: 'almacen',
        component: pages.AlmacenPageComponent,
        children: [
          { path: 'sectores', component: pages.SectoresPageComponent},
          { path: 'sectores/create', component: pages.SectorCreatePageComponent},
          { path: 'sectores/edit/:id', component: pages.SectorEditPageComponent},
          { path: 'sectores/show/:id', component: pages.SectorEditPageComponent},
          { path: 'conteo', component: pages.ConteoPageComponent},
          { path: 'conteo/show/:id', component: pages.ConteoEditPageComponent},
          { path: 'conteo/edit/:id', component: pages.ConteoEditPageComponent},
          { path: 'registro', component: pages.RegistroConteoPageComponent},
          { path: 'captura', component: pages.CapturaPageComponent},
          { path: 'captura/show/:id', component: pages.CapturaEditPageComponent},
          { path: 'captura/edit/:id', component: pages.CapturaEditPageComponent},
        ]
      },
      {
        path: 'cajas',
        component: pages.CajasPageComponent,
        children: [
          { path: 'cotizaciones', component: pages.CotizacionesPageComponent},
          { path: 'cotizaciones/create', component: pages.CotizacionCreatePageComponent},
          { path: 'cotizaciones/show/:id', component: CotizacionShowComponent},
        ]
      },
      {
        path: 'capturaMostrador',
        component: CapturaMostradorPageComponent,
        children: [
          { path: 'captura', component: pages.CapturaPageComponent},
          { path: 'captura/show/:id', component: pages.CapturaEditPageComponent},
          { path: 'captura/edit/:id', component: pages.CapturaEditPageComponent},
        ]
      },
      {
        path: 'embarques',
        component: pages.EmbarquesPageComponent,
        children: [
          // { path: '', redirectTo: 'facturistas', pathMatch: 'full'},
          { path: 'embarques', component: pages.EmbarquePageComponent},
          { path: 'embarques/create', component: pages.EmbarqueCreatePageComponent},
          { path: 'embarques/edit/:id', component: pages.EmbarqueEditPageComponent},
          { path: 'envios/edit/:id', component: pages.EnvioEditPageComponent},
          { path: 'transito', component: pages.TransitoPageComponent},
          { path: 'transito/edit/:id', component: pages.TransitoEditPageComponent},
          { path: 'regresos', component: pages.RegresosPageComponent},
          { path: 'facturasEnTransito', component: pages.VentasTransitoPageComponent},
          { path: 'facturasPendientes', component: pages.FacturasPendientesPageComponent},
          { path: 'trasladosPendientes', component: pages.TrasladosPendientesPageComponent},
          { path: 'devolucionesPendientes', component: pages.DevolucionesPendientesPageComponent},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticaRoutingModule { }
