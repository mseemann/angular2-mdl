import { Component } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'tooltip-demo',
  templateUrl: 'tooltip.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
})
export class TooltipDemo {
  protected tt1 = 'Follow';
}
