import {Component} from '@angular/core';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';

@Component({
  selector: 'demo-loading',
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'loading.component.html'
})
export class LoadingDemoComponent extends AbstractDemoComponent {
  public progress = 44;
  public indeterminate = true;
  public buffer = 78;
  public active = true;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

}
