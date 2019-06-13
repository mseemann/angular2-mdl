import {ModuleWithProviders, NgModule} from '@angular/core';
import {MdlButtonComponent} from './mdl-button.component';

const MDL_BUTTON_DIRECTIVES = [MdlButtonComponent];

@NgModule({
  imports: [],
  exports: MDL_BUTTON_DIRECTIVES,
  declarations: MDL_BUTTON_DIRECTIVES,
})
export class MdlButtonModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlButtonModule,
      providers: []
    };
  }
}

export * from './mdl-button.component';
