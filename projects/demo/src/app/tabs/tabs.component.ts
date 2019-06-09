import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {flyInOutTrigger, hostConfig} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';

@Component({
  selector: 'tabs-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'tabs.component.html',
  styles: [
      `
      .demo-tab-container {
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
export class TabsDemo extends AbstractDemoComponent implements OnInit {

  disableTargaryens = false;
  disableBaratheon = false;

  public activeIndex = 0;
  public myArray: string[] = null;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public tabChanged({index}) {
    this.activeIndex = index;
  }

  ngOnInit() {
    // Simulates a later change of tabs
    setTimeout(() => {
      this.myArray = ['a', 'b', 'c'];
    }, 1000);
  }
}
