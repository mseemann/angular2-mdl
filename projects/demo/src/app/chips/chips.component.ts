import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';

@Component({
  selector: 'demo-chips',
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'chips.component.html'
})
export class ChipsDemoComponent extends AbstractDemoComponent {

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public deleteChip() {
    console.log('delete the chip');
  }

}
