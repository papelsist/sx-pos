import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GastosRoutingModule } from './gastos-routing.module';
import { 
  MainPageComponent, MainDashboardComponent } from './_pages';


@NgModule({
  imports: [
    SharedModule,
    GastosRoutingModule
  ],
  declarations: [
    MainPageComponent, 
    MainDashboardComponent]
})
export class GastosModule { }
