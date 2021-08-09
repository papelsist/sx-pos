import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';

import {SharedModule} from 'app/shared/shared.module';
import { SolicitudesPageComponent } from './solicitudes-page/solicitudes-page.component';
import { reducers} from './store/reducers';
import {SolicitudesService} from 'app/ventas/solicitudes/services/solicitudes.service';
import {SolicitudesEffects} from 'app/ventas/solicitudes/store/effects/solicitudes.effects';
import { SolicitudCreateComponent } from './solicitud-create/solicitud-create.component';
import { SolicitudFormComponent } from './solicitud-form/solicitud-form.component';
import { BancoFieldComponent } from './solicitud-form/banco-field/banco-field.component';
import { CuentaFieldComponent } from './solicitud-form/cuenta-field/cuenta-field.component';
import { SolicitudesListComponent } from './solicitudes-list/solicitudes-list.component';
import { SolicitudEditComponent } from './solicitud-edit/solicitud-edit.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
    StoreModule.forFeature('solicitudes', reducers),
    EffectsModule.forFeature([SolicitudesEffects]),
  ],
  exports: [
    SolicitudesListComponent
  ],
  declarations: [
    SolicitudesPageComponent,
    SolicitudCreateComponent,
    SolicitudFormComponent,
    BancoFieldComponent,
    CuentaFieldComponent,
    SolicitudesListComponent,
    SolicitudEditComponent
  ],
  providers: [ SolicitudesService ]
})
export class SolicitudesModule { }
