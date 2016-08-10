import { NgModule } from '@angular/core';
import {
  MdlTooltipComponent
} from './mdl-tooltip.component';

import {
  MdlTooltipDirective,
  MdlTooltipLargeDirective
} from './mdl-tooltip.directive';

/** @deprecated */
export const MDL_TOOLTIP_DIRECTIVES = [
  MdlTooltipComponent,
  MdlTooltipLargeDirective,
  MdlTooltipDirective
];

export * from './mdl-tooltip.component';
export * from './mdl-tooltip.directive';

@NgModule({
  imports: [],
  exports: MDL_TOOLTIP_DIRECTIVES,
  declarations: MDL_TOOLTIP_DIRECTIVES,
})
export class MdlTooltipModule {}
