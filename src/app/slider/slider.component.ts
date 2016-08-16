import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'slider-demo',
  templateUrl: 'slider.component.html'
})
export class SliderDemo {
  protected minValue = 0;
  protected maxValue = 100;
  protected currentValue = 55;
}
