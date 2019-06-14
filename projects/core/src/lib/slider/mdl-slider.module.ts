import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MdlSliderComponent} from './mdl-slider.component';

const MDL_SLIDER_DIRECTIVES = [MdlSliderComponent];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: MDL_SLIDER_DIRECTIVES,
  declarations: MDL_SLIDER_DIRECTIVES,
})
export class MdlSliderModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlSliderModule,
      providers: []
    };
  }
}

export * from './mdl-slider.component';
