import { Component } from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';

@Component({
  moduleId: module.id,
  selector: 'slider-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'slider.component.html'
})
export class SliderDemo {
  protected minValue = 0;
  protected maxValue = 100;
  protected currentValue = 55;
}
