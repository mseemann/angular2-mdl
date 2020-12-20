import {Component} from '@angular/core';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';

@Component({
  selector: 'demo-toggle',
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'toggle.component.html'
})
export class ToggleDemoComponent extends AbstractDemoComponent {
  checkbox1 = true;
  checkbox2 = false;

  radioOption = '1';

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public onChange(newValue: unknown): void {
    console.log(newValue);
  }
}
