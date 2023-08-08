import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MaterialModule } from './_material/material.module';
import { CovalentModule } from './_covalent/covalent.module';

import { PageFooterComponent } from './page-footer/page-footer.component';
import { AddressPipe } from './pipes/address.pipe';
import { ModuleSelectorComponent } from './module-selector/module-selector.component';
import { ComentarioFieldComponent } from './_fields/comentario-field/comentario-field.component';
import { UsoCfdiFieldComponent } from './_fields/uso-cfdi-field/uso-cfdi-field.component';
import { TipoDeCambioComponent } from './_fields/tipo-de-cambio/tipo-de-cambio.component';
import { MonedaFieldComponent } from './_fields/moneda-field/moneda-field.component';
import { MomentModule } from 'angular2-moment';
import { HasRoleDirective } from './directives/has-role.directive';
import { SucursalFieldComponent } from './_fields/sucursal-field/sucursal-field.component';
import { ProductoFieldComponent } from './_fields/producto-field/producto-field.component';
import { ExistenciaFieldComponent } from './_fields/existencia-field/existencia-field.component';
import { GlobalUserNavListComponent } from './global-user-nav-list/global-user-nav-list.component';
import { ConsultasRapidasComponent } from './_components/consultas-rapidas/consultas-rapidas.component';

import * as Layout from './layout';
import { QvProductosBtnComponent } from './quick-views';
import { DireccionFormComponent } from './_components/direccion-form/direccion-form.component';
import { ClienteFieldComponent } from './_fields/cliente-field/cliente-field.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { FormaDePagoComponent } from './_fields/forma-de-pago/forma-de-pago.component';
import { BancoFieldComponent } from './_fields/banco-field/banco-field.component';
import { AlmacenesFieldComponent } from './_fields/almacenes-field/almacenes-field.component';
import { SucursalLabelComponent } from './sucursal-label/sucursal-label.component';
import { UsuarioSecFieldComponent } from './_fields/usuario-sec-field/usuario-sec-field.component';
import { ToUpperCaseDirective } from './directives/to-upper-case.directive';

import { LogoutComponent } from './_components/logout/logout.component';
import { SelectorFechaComponent } from './_components/selector-fecha/selector-fecha.component';
import { OnlyIntegersDirective } from './directives/only-integers.directive';
import { CancelacionDialogComponent } from 'app/shared/_components/cancelacion-dialog/cancelacion-dialog.component';
import { ProveedorFieldComponent } from './_fields/proveedor-field/proveedor-field.component';
import { ProductoProvFieldComponent } from './_fields/producto-prov-field/producto-prov-field.component';
import { PeriodoDialogComponent } from './_components/periodo-dialog/periodo-dialog.component';
import { PeriodoPickerComponent } from './_components/periodo-picker/periodo-picker.component';
import { UsuarioDialogComponent } from '@siipapx/shared/_components/usuario-dialog/usuario-dialog.component';
import { LineasFieldComponent } from './_fields/lineas-field/lineas-field.component';
import { ClasesFieldComponent } from './_fields/clases-field/clases-field.component';
import { ChoferesFieldComponent } from './_fields/choferes-field/choferes-field.component';
import { ValeAutomaticoDialogComponent } from './_components/vale-automatico-dialog/vale-automatico-dialog.component';
import { ValeGridPartidasComponent } from './_components/vale-automatico-dialog/partidas/partidas-grid.component';


const FLEX_LAYOUT_MODULES: any[] = [FlexLayoutModule];

const ANGULAR_MODULES: any[] = [FormsModule, ReactiveFormsModule];

const OTHERS_MODULES: any[] = [NgxChartsModule, MomentModule];

const COMPONENTS: any[] = [
  ModuleSelectorComponent,
  UsoCfdiFieldComponent,
  ComentarioFieldComponent,
  TipoDeCambioComponent,
  MonedaFieldComponent,
  DireccionFormComponent,
  QvProductosBtnComponent,
  ClienteFieldComponent,
  PeriodoDialogComponent,
  PeriodoPickerComponent,
  UsuarioDialogComponent,
  ValeAutomaticoDialogComponent,
  ValeGridPartidasComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ANGULAR_MODULES,
    MaterialModule,
    CovalentModule,
    OTHERS_MODULES,
    FLEX_LAYOUT_MODULES
  ],
  declarations: [
    ...COMPONENTS,
    PageFooterComponent,
    AddressPipe,
    HasRoleDirective,
    SucursalFieldComponent,
    ProductoFieldComponent,
    ExistenciaFieldComponent,
    GlobalUserNavListComponent,
    ConsultasRapidasComponent,
    Layout.MainLayoutComponent,
    Layout.NavLayoutComponent,
    Layout.NavListLayoutComponent,
    Layout.ManageListLayoutComponent,
    DireccionFormComponent,
    OnlyNumbersDirective,
    FormaDePagoComponent,
    BancoFieldComponent,
    AlmacenesFieldComponent,
    SucursalLabelComponent,
    UsuarioSecFieldComponent,
    ToUpperCaseDirective,
    LogoutComponent,
    SelectorFechaComponent,
    OnlyIntegersDirective,
    CancelacionDialogComponent,
    ProveedorFieldComponent,
    ProductoProvFieldComponent,
    LineasFieldComponent,
    ClasesFieldComponent,
    ChoferesFieldComponent
  ],
  exports: [
    ANGULAR_MODULES,
    MaterialModule,
    CovalentModule,
    OTHERS_MODULES,
    FLEX_LAYOUT_MODULES,
    ...COMPONENTS,
    PageFooterComponent,
    // Layout components
    Layout.MainLayoutComponent,
    Layout.NavLayoutComponent,
    Layout.NavListLayoutComponent,
    Layout.ManageListLayoutComponent,
    AddressPipe,
    HasRoleDirective,
    SucursalFieldComponent,
    ProductoFieldComponent,
    ExistenciaFieldComponent,
    GlobalUserNavListComponent,
    ConsultasRapidasComponent,
    OnlyNumbersDirective,
    FormaDePagoComponent,
    BancoFieldComponent,
    AlmacenesFieldComponent,
    SucursalLabelComponent,
    UsuarioSecFieldComponent,
    ToUpperCaseDirective,
    SelectorFechaComponent,
    LogoutComponent,
    OnlyIntegersDirective,
    CancelacionDialogComponent,
    ProveedorFieldComponent,
    ProductoProvFieldComponent,
    LineasFieldComponent,
    ClasesFieldComponent,
    ChoferesFieldComponent
  ],
  entryComponents: [
    SelectorFechaComponent,
    CancelacionDialogComponent,
    PeriodoDialogComponent,
    UsuarioDialogComponent,
    ValeAutomaticoDialogComponent,
  
  ]
})
export class SharedModule {}
