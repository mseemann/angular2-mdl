import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MdlTooltipComponent, MdlSimpleTooltipComponent
} from './mdl-tooltip.component';

import {
  MdlTooltipDirective,
  MdlTooltipLargeDirective
} from './mdl-tooltip.directive';

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
  declarations: [...MDL_TOOLTIP_DIRECTIVES, MdlSimpleTooltipComponent ],
  entryComponents: [MdlSimpleTooltipComponent]
})
export class MdlTooltipModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlTooltipModule,
      providers: []
    };
  }
}
