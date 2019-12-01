import {ModuleWithProviders, NgModule} from '@angular/core';
import {
  MdlAnchorRippleDirective,
  MdlButtonRippleDirective,
  MdlCheckboxRippleDirective,
  MdlIconToggleRippleDirective,
  MdlMenuItemRippleDirective,
  MdlRadioRippleDirective,
  MdlSwitchRippleDirective
} from './mdl-ripple.directive';

const MDL_RIPPLE_DIRECTIVES = [MdlCheckboxRippleDirective,
  MdlButtonRippleDirective,
  MdlRadioRippleDirective,
  MdlIconToggleRippleDirective,
  MdlSwitchRippleDirective,
  MdlMenuItemRippleDirective,
  MdlAnchorRippleDirective];

@NgModule({
  imports: [],
  exports: MDL_RIPPLE_DIRECTIVES,
  declarations: MDL_RIPPLE_DIRECTIVES,
})
export class MdlRippleModule {
  public static forRoot(): ModuleWithProviders<MdlRippleModule> {
    return {
      ngModule: MdlRippleModule,
      providers: []
    };
  }
}

export * from '../ripple/mdl-ripple.directive';
