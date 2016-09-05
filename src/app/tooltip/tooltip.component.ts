import { Component } from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from './../abstract-demo.component';

@Component({
  moduleId: module.id,
  selector: 'tooltip-demo',
  // host: hostConfig, // disabled animations because of misabligned tooltips :(
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'tooltip.component.html'
})
export class TooltipDemo extends AbstractDemoComponent {
  protected tt1 = 'Follow';

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

}
