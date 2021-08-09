import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
  MainPageComponent,
  MainDashboardComponent,
  ClienteDashboardComponent
} from './_pages';

const routes: Routes = [
  {
    path: 'clientes',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: MainDashboardComponent
      },
    ]
  },
  {
    path: 'dashboard',
    component: ClienteDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
