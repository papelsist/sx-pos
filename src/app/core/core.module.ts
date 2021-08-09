import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PageNotFoundComponent } from './_pages/page-not-found/page-not-found.component';
import { ConfigService } from 'app/core/services/config.service';


@NgModule({
  imports: [
    SharedModule,
    RouterModule,
  ],
  declarations: [MainComponent, HomeComponent, SidenavComponent, PageNotFoundComponent],
  exports: [MainComponent, HomeComponent],
  providers: [ConfigService]
})
export class CoreModule { }

