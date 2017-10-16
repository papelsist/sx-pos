import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as pages from './_pages/';

const routes: Routes = [
  {
    path: '',
    component: pages.MainPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: pages.MainDashboardComponent},
      {
        path: 'inventarios',
        component: pages.InventariosPageComponent,
        children: [
          { path: '', redirectTo: 'movimientos', pathMatch: 'full'},
          { path: 'movimientos', component: pages.MovimientosPageComponent},
          { path: 'movimientos/create', component: pages.MovimientosCreateComponent},
          { path: 'movimientos/show/:id', component: pages.MovimientosShowComponent},
          { path: 'existencias', component: pages.ExistenciasPageComponent},
          { path: 'transformaciones', component: pages.TransformacionesPageComponent},
          { path: 'transformaciones/create', component: pages.TransformacionesCreatePageComponent},
          { path: 'transformaciones/show/:id', component: pages.TransformacionesShowPageComponent},
          { path: 'transformaciones/edit/:id', component: pages.TransformacionesEditPageComponent},
          // Devoluciones de venta
          { path: 'devoluciones', component: pages.DevolucionesVentaPageComponent},
          { path: 'devoluciones/create', component: pages.DevolucionCreatePageComponent},
          { path: 'devoluciones/show/:id', component: pages.DevolucionesShowPageComponent},
          // Recepcion de compras
          { path: 'coms', component: pages.ComsPageComponent },
          { path: 'coms/show/:id', component: pages.ComsShowPageComponent },
          { path: 'coms/create', component: pages.ComCreatePageComponent },
          // Devoluciones de compras
          { path: 'decs', component: pages.DecsPageComponent},
          { path: 'decs/show/:id', component: pages.DecShowPageComponent},
          { path: 'decs/create', component: pages.DecCreatePageComponent},
          // Traslados
          { path: 'traslados', component: pages.TrasladosPageComponent},
          { path: 'traslados/sol/show/:id', component: pages.SolShowPageComponent},
          { path: 'traslados/sol/create', component: pages.SolCreatePageComponent}
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
        path: 'embarques',
        component: pages.EmbarquesPageComponent,
        children: [
          //{ path: '', redirectTo: 'facturistas', pathMatch: 'full'},
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
