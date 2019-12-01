import {ModuleWithProviders, NgModule} from '@angular/core';
import {MdlShadowDirective} from './mdl-shadow.directive';

const MDL_SHADOW_DIRECTIVES = [MdlShadowDirective];

@NgModule({
  imports: [],
  exports: MDL_SHADOW_DIRECTIVES,
  declarations: MDL_SHADOW_DIRECTIVES,
})
export class MdlShadowModule {
  public static forRoot(): ModuleWithProviders<MdlShadowModule> {
    return {
      ngModule: MdlShadowModule,
      providers: []
    };
  }
}

export * from './mdl-shadow.directive';
