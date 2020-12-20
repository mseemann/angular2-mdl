import {ModuleWithProviders, NgModule} from '@angular/core';
import {MdlSimpleTooltipComponent, MdlTooltipComponent} from './mdl-tooltip.component';

import {MdlTooltipDirective, MdlTooltipLargeDirective} from './mdl-tooltip.directive';

const MDL_TOOLTIP_DIRECTIVES = [
  MdlTooltipComponent,
  MdlTooltipLargeDirective,
  MdlTooltipDirective
];

export * from './mdl-tooltip.component';
export * from './mdl-tooltip.directive';

@NgModule({
  imports: [],
  exports: MDL_TOOLTIP_DIRECTIVES,
  declarations: [...MDL_TOOLTIP_DIRECTIVES, MdlSimpleTooltipComponent],
  entryComponents: [MdlSimpleTooltipComponent]
})
export class MdlTooltipModule {
  static forRoot(): ModuleWithProviders<MdlTooltipModule> {
    return {
      ngModule: MdlTooltipModule,
      providers: []
    };
  }
}
