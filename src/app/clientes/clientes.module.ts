import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import {
  MainPageComponent,
  MainDashboardComponent,
  ClienteDashboardComponent
} from './_pages';

import { ClienteFieldComponent } from './cliente-field/cliente-field.component';
import { AddNewClienteService } from "./services/add-new-cliente/add-new-cliente.service";
import { AddClienteDialogComponent } from "./_components/add-cliente-dialog/add-cliente-dialog.component";
import { AddClienteContactoComponent } from "./_components/add-cliente-dialog/add-cliente-contacto.component";
import {ClienteService} from 'app/clientes/services/cliente.service';

export const COMPONENTS = [
  MainPageComponent,
  MainDashboardComponent,
  ClienteDashboardComponent,
  ClienteFieldComponent,
  AddClienteDialogComponent,
  AddClienteContactoComponent,
];

/**
* Feathure module to sopport security to all application
* This is an eagerly loaded module
*/
@NgModule({
  imports: [SharedModule, ClientesRoutingModule],
  declarations: COMPONENTS,
  entryComponents: [
    AddClienteDialogComponent
  ],
  exports: [
    ClienteFieldComponent
  ]
})
export class ClientesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootClientesModule,
      providers: [ClienteService, AddNewClienteService]
    }
  }
}

@NgModule({
  imports: [
    ClientesModule,
    /**
     * Feature store module for the state of this module
     */
    // StoreModule.forFeature('auth', reducers),
    /**
     * Effects for the auth module
     */
    // EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [],
  exports: []
})
export class RootClientesModule { }
