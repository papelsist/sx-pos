import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';

import {SharedModule} from 'app/shared/shared.module';
import { SoportePageComponent } from './soporte-page/soporte-page.component';
import { SoporteService } from './services/soporte.service';
import { SoporteCreateComponent } from './soporte-create/soporte-create.component';
import { SoporteFormComponent } from './soporte-form/soporte-form.component';
import { SoporteListComponent } from './soporte-list/soporte-list.component';
import { SoporteShowComponent } from './soporte-show/soporte-show.component';





@NgModule({
  entryComponents: [
    SoporteShowComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ], exports: [],
  declarations: [SoportePageComponent, SoporteCreateComponent, SoporteFormComponent, SoporteListComponent, SoporteShowComponent],
  providers: [
      SoporteService
    ]
})
export class SoporteModule { }
