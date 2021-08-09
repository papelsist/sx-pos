import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TrasladosRoutingModule } from './traslados-routing.module';
import { TrasladosPageComponent } from './traslados-page/traslados-page.component';
import { SolicitudesPageComponent } from './solicitudes-page/solicitudes-page.component';
import { RecepcionesPageComponent } from './recepciones-page/recepciones-page.component';
import { AtencionPageComponent } from './atencion-page/atencion-page.component';
import { SolicitudesListComponent } from './_components/solicitudes-list/solicitudes-list.component';
import { SolicitudesService } from 'app/traslados/services/solicitudes.service';
import { SolCreatePageComponent } from './solicitudes-page/sol-create-page.component';
import { SolicitudDeTrasladoFormComponent } from './_components/solicitud-de-traslado-form/solicitud-de-traslado-form.component';
import { SolicitudPartidasListComponent } from './_components/solicitud-partidas-list/solicitud-partidas-list.component';
import { SoldetAddComponent } from './_components/soldet-add/soldet-add.component';
import { SolShowPageComponent } from './solicitudes-page/sol-show-page.component';
import { SolsPoratenderListComponent } from './atencion-page/sols-poratender-list/sols-poratender-list.component';
import { SolAtencionComponent } from './atencion-page/sol-atencion/sol-atencion.component';
import { SalidasPageComponent } from './salidas-page/salidas-page.component';
import { TrasladosService } from 'app/traslados/services/traslados.service';
import { TpsListComponent } from './salidas-page/tps-list/tps-list.component';
import { AtenderSolComponent } from './atencion-page/atender-sol/atender-sol.component';
import { SalidaShowComponent } from './salidas-page/salida-show/salida-show.component';
import { EntradaShowComponent } from './recepciones-page/entrada-show/entrada-show.component';
import { TpeListComponent } from './recepciones-page/tpe-list/tpe-list.component';
import { RelacionTpsComponent } from './reportes/relacion-tps/relacion-tps.component';
import { RelacionTpeComponent } from './reportes/relacion-tpe/relacion-tpe.component';
import { SolesPendientesComponent } from './reportes/soles-pendientes/soles-pendientes.component';
import { ValesPendientesComponent } from './reportes/vales-pendientes/vales-pendientes.component';
import { LogisticaModule } from '../logistica/logistica.module';


@NgModule({
  imports: [
    SharedModule,
    TrasladosRoutingModule
  ],
  declarations: [TrasladosPageComponent,
    SolicitudesPageComponent, RecepcionesPageComponent, AtencionPageComponent,
    SolicitudesListComponent,
    SolCreatePageComponent,
    SolicitudDeTrasladoFormComponent,
    SolicitudPartidasListComponent,
    SoldetAddComponent,
    SolShowPageComponent,
    SolsPoratenderListComponent,
    SolAtencionComponent,
    SalidasPageComponent,
    TpsListComponent,
    AtenderSolComponent,
    SalidaShowComponent,
    EntradaShowComponent,
    TpeListComponent,
    RelacionTpsComponent,
    RelacionTpeComponent,
    SolesPendientesComponent,
    ValesPendientesComponent],
  providers: [SolicitudesService, TrasladosService],
  entryComponents: [SoldetAddComponent, AtenderSolComponent,RelacionTpsComponent,RelacionTpeComponent,SolesPendientesComponent,ValesPendientesComponent]
})
export class TrasladosModule { }
