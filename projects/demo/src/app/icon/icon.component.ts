import {Component} from '@angular/core';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';

@Component({
  selector: 'demo-icon',
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'icon.component.html'
})
export class IconDemoComponent extends AbstractDemoComponent {
  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}
