import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from "app/shared/shared.module";
import { ProductosRoutingModule } from './productos-routing.module';

import { ProdSelectorButtonComponent } from './_components/prod-selector/prod-selector-button.component';
import { ProdSelectorComponent } from './_components/prod-selector/prod-selector.component';
import { ProdFieldComponent } from './_components/prod-field/prod-field.component';
import { ProductoService } from 'app/productos/services/producto.service';
import { ProductUtils } from 'app/productos/services/productUtils';



@NgModule({
  imports: [
    SharedModule,
    ProductosRoutingModule
  ],
  declarations: [ProdSelectorButtonComponent, ProdSelectorComponent, ProdFieldComponent],
  exports: [ProdSelectorButtonComponent],
  providers: [ProductoService, ProductUtils],
  entryComponents: [
    ProdSelectorComponent
  ],
})
export class ProductosModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootProductosModule,
      providers: [ProductUtils, ProductoService]
    }
  }
}

@NgModule({
  imports: [
    ProductosModule,
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
export class RootProductosModule { }
