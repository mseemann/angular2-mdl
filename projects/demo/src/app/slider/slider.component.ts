import {Component} from '@angular/core';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';

@Component({
  selector: 'demo-slider',
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'slider.component.html'
})
export class SliderDemoComponent extends AbstractDemoComponent {

  minValue = 0;
  maxValue = 100;
  currentValue = 55;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}
