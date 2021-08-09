import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.gard';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';
import { LoginPageComponent } from './pages/login-page.component';
import { LoginFormComponent } from './components/login-form.component';
import {ConfigEffects} from 'app/core/store/config/config.effects';


export const COMPONENTS = [LoginPageComponent, LoginFormComponent];

/**
 * Feathure module to sopport security to all application
 * This is an eagerly loaded module
 */
@NgModule({
  imports: [SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AuthModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, AuthGuard]
    }
  }
}

@NgModule({
  imports: [
    AuthModule,
    AuthRoutingModule,
    /**
     * Feature store module for the state of this module
     */
    StoreModule.forFeature('auth', reducers),
    /**
     * Effects for the auth module
     */
    EffectsModule.forFeature([AuthEffects, ConfigEffects])
  ],
  declarations: [],
  exports: []
})
export class RootAuthModule { }
