import {ModuleWithProviders, NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdlIconToggleComponent} from './mdl-icon-toggle.component';
import {MdlIconModule} from '../icon/mdl-icon.module';

const MDL_ICON_TOGGLE_DIRECTIVES = [MdlIconToggleComponent];

@NgModule({
  imports: [MdlIconModule, CommonModule, FormsModule],
  exports: MDL_ICON_TOGGLE_DIRECTIVES,
  declarations: MDL_ICON_TOGGLE_DIRECTIVES,
})
export class MdlIconToggleModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlIconToggleModule,
      providers: []
    };
  }
}
