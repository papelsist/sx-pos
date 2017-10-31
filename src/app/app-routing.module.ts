import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './core/main/main.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './_auth/services/auth.gard';

import { PageNotFoundComponent } from './core/_pages/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'compras', loadChildren: './compras/compras.module#ComprasModule'},
      { path: 'logistica', loadChildren: './logistica/logistica.module#LogisticaModule'},
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      // { path: '**', component: PageNotFoundComponent }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'ventas',
    loadChildren: './ventas/ventas.module#VentasModule'
  },
  {
    path: 'caja',
    loadChildren: './caja/caja.module#CajaModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
