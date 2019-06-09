import { Component } from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';

@Component({
  selector: 'list-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'list.component.html',
  styles: [
`
  mdl-list {
    width: 300px;
  }
  
  mdl-radio, mdl-checkbox, mdl-switch {
    display: inline;
  }
`
  ]
})
export class ListDemo extends AbstractDemoComponent {
  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}
