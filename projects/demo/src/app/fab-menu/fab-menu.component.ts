import {Component} from '@angular/core';
import {AbstractDemoComponent} from '../abstract-demo.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';

@Component({
  selector: 'demo-fab-menu',
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.scss'],
  animations: [
    flyInOutTrigger
  ],
})
export class FabMenuComponent extends AbstractDemoComponent {


  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  alert(msg: string): void {
    console.log(msg);
  }
}
