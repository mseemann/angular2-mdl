import {Component} from '@angular/core';
import {AbstractDemoComponent} from '../abstract-demo.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';

@Component({
  selector: 'demo-popover',
  templateUrl: './popover.component.html',
  animations: [
    flyInOutTrigger
  ],
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent extends AbstractDemoComponent {


  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  onShow() {
    console.log('onShow');
  }

  onHide() {
    console.log('onHide');
  }
}
