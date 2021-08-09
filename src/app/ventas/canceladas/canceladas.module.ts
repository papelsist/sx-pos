import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { CanceladasPageComponent } from './canceladas-page/canceladas-page.component';
import { CanceladasListComponent } from './canceladas-list/canceladas-list.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [CanceladasPageComponent, CanceladasListComponent],
  exports: [CanceladasPageComponent]
})
export class CanceladasModule { }
