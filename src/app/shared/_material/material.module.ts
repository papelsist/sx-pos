import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdChipsModule, MdAutocompleteModule, MdDatepickerModule, MdNativeDateModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdChipsModule, MdAutocompleteModule,
  MdNativeDateModule, MdDatepickerModule
];
 /**
  * Special module to controll Material desing modules
  */
@NgModule({
  imports: [
    CommonModule,
    MATERIAL_MODULES,
  ],
  declarations: [],
  exports: [
    MATERIAL_MODULES,
  ],
})
export class MaterialModule { }
