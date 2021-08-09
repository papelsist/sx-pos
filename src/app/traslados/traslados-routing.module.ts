import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TrasladosPageComponent} from './traslados-page/traslados-page.component';
import {SolicitudesPageComponent} from './solicitudes-page/solicitudes-page.component';
import {RecepcionesPageComponent} from './recepciones-page/recepciones-page.component';
import {AtencionPageComponent} from './atencion-page/atencion-page.component';
import {SolCreatePageComponent} from './solicitudes-page/sol-create-page.component';
import { SolShowPageComponent} from './solicitudes-page/sol-show-page.component';
import { SolAtencionComponent } from './atencion-page/sol-atencion/sol-atencion.component';
import { SalidasPageComponent } from './salidas-page/salidas-page.component';
import { SalidaShowComponent } from './salidas-page/salida-show/salida-show.component';
import { EntradaShowComponent } from './recepciones-page/entrada-show/entrada-show.component';


const routes: Routes = [
  {
    path: '',
    component: TrasladosPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'solicitudes',
        pathMatch: 'full'
      },
      {
        path: 'solicitudes',
        component: SolicitudesPageComponent
      },
      {
        path: 'solicitudes/create',
        component: SolCreatePageComponent
      },
      {
        path: 'solicitudes/show/:id',
        component: SolShowPageComponent
      },
      {
        path: 'atencion',
        component: AtencionPageComponent
      },
      {
        path: 'atencion/edit/:id',
        component: SolAtencionComponent
      },
      {
        path: 'recepciones',
        component: RecepcionesPageComponent
      },
      {
        path: 'recepciones/show/:id',
        component: EntradaShowComponent
      },
      {
        path: 'salidas',
        component: SalidasPageComponent
      },
      {
        path: 'salidas/show/:id',
        component: SalidaShowComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrasladosRoutingModule { }
