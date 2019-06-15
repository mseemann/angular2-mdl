import {ModuleWithProviders, NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MdlTextFieldComponent} from './mdl-textfield.component';
import {MdlIconModule} from '../icon/mdl-icon.module';
import {MdlButtonModule} from '../button/mdl-button.module';


@NgModule({
  imports: [MdlIconModule, MdlButtonModule, FormsModule, CommonModule],
  exports: [MdlTextFieldComponent],
  declarations: [MdlTextFieldComponent],
})
export class MdlTextFieldModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlTextFieldModule,
      providers: []
    };
  }
}

export * from './mdl-textfield.component';
