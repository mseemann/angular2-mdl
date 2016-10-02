import { Component } from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';

@Component({
  selector: 'button-demo',
  host: {
    '[@flyInOut]': 'true',
    '[style.display]': "'block'"
  },
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'button.component.html'
})
export class ButtonDemo extends AbstractDemoComponent {
  public buttonType = 'raised';
  public doRipple = false;
  public colored = '';
  public btnDisabled = false;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}
