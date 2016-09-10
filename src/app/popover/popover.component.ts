import { Component } from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from './../abstract-demo.component';

@Component({
  moduleId: module.id,
  selector: 'popover-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'popover.component.html',
})
export class PopoverDemo extends AbstractDemoComponent {
  option1: string;
  options: any = { one: true};

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public action(option) {
    this.option1 = option;
    console.log('clicked action', option);
  }

  public setOption(event, option) {
    event.stopPropagation();
    this.options[option] = !this.options[option];
  }

}
