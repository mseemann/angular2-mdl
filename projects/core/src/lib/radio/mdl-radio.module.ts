import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdlRadioComponent, MdlRadioGroupRegisty} from './mdl-radio.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [MdlRadioComponent],
  declarations: [MdlRadioComponent]
})
export class MdlRadioModule {
  public static forRoot(): ModuleWithProviders<MdlRadioModule> {
    return {
      ngModule: MdlRadioModule,
      providers: [MdlRadioGroupRegisty]
    };
  }
}

export * from './mdl-radio.component';
