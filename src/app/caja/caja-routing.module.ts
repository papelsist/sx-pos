import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CajaPageComponent } from './caja-page/caja-page.component';
import { MainPageComponent } from './_main-page/main-page.component';
import { PendientesPageComponent } from './facturacion/pendientes-page/pendientes-page.component';
import { CobroComponent } from './facturacion/cobro/cobro.component';
import { GeneradasPageComponent } from './facturacion/generadas-page/generadas-page.component';
import { CobranzaCodComponent } from './facturacion/cobranza-cod/cobranza-cod.component';
import { CobroCodComponent } from './facturacion/cobranza-cod/cobro-cod/cobro-cod.component';
import { CortesPageComponent } from './cortes/cortes-page/cortes-page.component';
import { FacturaShowComponent } from 'app/caja/facturacion/factura-show/factura-show.component';
import { CorteCobranzaComponent } from 'app/caja/cortes/corte-cobranza/corte-cobranza.component';
import { CorteMorrallaComponent } from 'app/caja/cortes/corte-morralla/corte-morralla.component';
import { CorteFondoFijoComponent } from './cortes/corte-fondo-fijo/corte-fondo-fijo.component';
import { FichasPageComponent } from './cortes/fichas-page/fichas-page.component';
import { FondoFijoEditComponent } from './cortes/corte-fondo-fijo/fondo-fijo-edit/fondo-fijo-edit.component';
import { CajaGuard } from 'app/caja/services/caja.guard';
import { AnticiposComponent } from './anticipos/anticipos.component';
import { AnticipoCreateComponent } from './anticipos/anticipo-create/anticipo-create.component';
import { AnticipoShowComponent } from './anticipos/anticipo-show/anticipo-show.component';
import { AnticipoResolver } from './anticipos/anticipo.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [CajaGuard],
    children: [
      {
        path: '',
        component: CajaPageComponent,
        children: [
          {
            path: 'facturacion',
            component: PendientesPageComponent
          },
          {
            path: 'cobro/:id',
            component: CobroComponent
          },
          {
            path: 'generadas',
            component: GeneradasPageComponent
          },
          {
            path: 'generadas/show/:id',
            component: FacturaShowComponent
          },
          {
            path: 'cobranzaCod',
            component: CobranzaCodComponent
          },
          {
            path: 'cobroCod/:id',
            component: CobroCodComponent
          },
          {
            path: 'anticipos',
            component: AnticiposComponent
          },
          {
            path: 'anticipos/create',
            component: AnticipoCreateComponent
          },
          {
            path: 'anticipos/:id',
            component: AnticipoShowComponent,
            resolve: { anticipo: AnticipoResolver }
          }
        ]
      },
      {
        path: 'cortes',
        component: CortesPageComponent,
        children: [
          { path: 'cobranza', component: CorteCobranzaComponent },
          { path: 'fondoFijo', component: CorteFondoFijoComponent },
          { path: 'fondoFijo/edit/:id', component: FondoFijoEditComponent },
          { path: 'morralla', component: CorteMorrallaComponent },
          { path: 'fichas', component: FichasPageComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AnticipoResolver]
})
export class CajaRoutingModule {}
