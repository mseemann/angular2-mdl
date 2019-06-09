import { Component, ViewEncapsulation } from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';

@Component({
  selector: 'shadow-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'shadow.component.html',
  styles: [`
    .shadow-example {
      height: 70px;
      width: 100px;
      margin:20px;
      float: left;
    }
    .clearfix {
        clear: both;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ShadowDemo extends AbstractDemoComponent {

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}
