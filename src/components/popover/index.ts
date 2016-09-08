import { NgModule } from '@angular/core';
import {
  MdlPopoverComponent
} from './mdl-popover.component';
import { CommonModule } from '@angular/common';

const MDL_POPOVER_DIRECTIVES = [
  MdlPopoverComponent
];

export * from './mdl-popover.component';

@NgModule({
  imports: [CommonModule],
  exports: MDL_POPOVER_DIRECTIVES,
  declarations: MDL_POPOVER_DIRECTIVES,
})
export class MdlPopoverModule {}
