import { NgModule } from '@angular/core';

import { ModuloSelectorComponent } from './_pages/modulo-selector/modulo-selector.component';
import {SharedModule} from '../shared/shared.module';

export const COMPONENTS = [ModuloSelectorComponent];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ModuloSelectorComponent],
  exports: [
    ...COMPONENTS
  ]
})
export class ModulosModule { }
