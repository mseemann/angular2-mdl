import { Component } from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';

@Component({
  moduleId: module.id,
  selector: 'tooltip-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'tooltip.component.html'
})
export class TooltipDemo {
  protected tt1 = 'Follow';
}
