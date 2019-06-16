import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';

@Component({
  selector: 'demo-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  animations: [
    flyInOutTrigger
  ],
})
export class ExpansionPanelComponent extends AbstractDemoComponent {

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

}
