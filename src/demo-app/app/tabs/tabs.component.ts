import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';

@Component({
  selector: 'tabs-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'tabs.component.html',
  styles: [
    `
    .demo-tab-container{
       display: inline-block;
    }
    mdl-icon {
       vertical-align: middle;
    }
    .mdl-tabs__tab {
        cursor: pointer;
    }
    .demo-toggle-disabled-container mdl-switch {
        margin: 5px 0;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class TabsDemo extends AbstractDemoComponent {

  public activeIndex = 0;
  public disableTargaryens = true;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public tabChanged({index}) {
    this.activeIndex = index;
  }
}
