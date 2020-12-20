import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdlCheckboxComponent} from './mdl-checkbox.component';

const MDL_CHECKBOX_DIRECTIVES = [MdlCheckboxComponent];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: MDL_CHECKBOX_DIRECTIVES,
  declarations: MDL_CHECKBOX_DIRECTIVES,
})
export class MdlCheckboxModule {
  static forRoot(): ModuleWithProviders<MdlCheckboxModule> {
    return {
      ngModule: MdlCheckboxModule,
      providers: []
    };
  }
}

export * from './mdl-checkbox.component';
