import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdlProgressComponent} from './mdl-progress.component';

const MDL_PROGRESS_DIRECTIVES = [MdlProgressComponent];

@NgModule({
  imports: [CommonModule],
  exports: MDL_PROGRESS_DIRECTIVES,
  declarations: MDL_PROGRESS_DIRECTIVES,
})
export class MdlProgressModule {
  static forRoot(): ModuleWithProviders<MdlProgressModule> {
    return {
      ngModule: MdlProgressModule,
      providers: []
    };
  }
}

export * from './mdl-progress.component';
