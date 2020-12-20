import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdlSwitchComponent} from './mdl-switch.component';

const MDL_SWITCH_DIRECTIVES = [MdlSwitchComponent];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: MDL_SWITCH_DIRECTIVES,
  declarations: MDL_SWITCH_DIRECTIVES,
})
export class MdlSwitchModule {
  static forRoot(): ModuleWithProviders<MdlSwitchModule> {
    return {
      ngModule: MdlSwitchModule,
      providers: []
    };
  }
}

export * from './mdl-switch.component';
