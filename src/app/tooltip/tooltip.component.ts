import { Component } from '@angular/core';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'tooltip-demo',
  templateUrl: 'tooltip.component.html',
  directives: [
    PrismDirective
  ],
})
export class TooltipDemo {
  protected tt1 = 'Follow';
}
