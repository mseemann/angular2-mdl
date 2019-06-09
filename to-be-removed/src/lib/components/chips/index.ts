import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlIconModule } from '../icon/mdl-icon.component';
import { MdlChipComponent } from './mdl-chip.component';
import { MdlChipContactDirective } from './mdl-chip-contact.directive';

export * from './mdl-chip.component';
export * from './mdl-chip-contact.directive';

const DIRECTIVES = [MdlChipComponent, MdlChipContactDirective];

@NgModule({
  imports: [MdlIconModule, CommonModule],
  exports: DIRECTIVES,
  declarations: DIRECTIVES,
})
export class MdlChipModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlChipModule,
      providers: []
    };
  }
}
