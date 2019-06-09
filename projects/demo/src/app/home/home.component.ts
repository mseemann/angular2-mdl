import {Component, ViewEncapsulation} from '@angular/core';
import {flyInOutTrigger, hostConfig} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends AbstractDemoComponent {

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }


}
