import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdlPopoverModule} from '@angular-mdl/popover';
import {MdlOptionComponent} from './option';
import {MDL_SELECT_VALUE_ACCESSOR, MdlSelectComponent} from './select.component';


@NgModule({
  imports: [
    CommonModule,
    MdlPopoverModule
  ],
  exports: [
    MdlSelectComponent,
    MdlOptionComponent
  ],
  declarations: [
    MdlSelectComponent,
    MdlOptionComponent
  ],
  providers: [
    MDL_SELECT_VALUE_ACCESSOR
  ]
})
export class MdlSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlSelectModule,
      providers: []
    };
  }
}

