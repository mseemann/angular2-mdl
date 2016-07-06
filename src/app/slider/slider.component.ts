import { Component } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'slider-demo',
  templateUrl: 'slider.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
})
export class SliderDemo {
  protected minValue = 0;
  protected maxValue = 100;
  protected currentValue = 55;
}
