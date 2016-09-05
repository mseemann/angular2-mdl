import { Component } from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from './../abstract-demo.component';

@Component({
  moduleId: module.id,
  selector: 'textfield-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'textfield.component.html'
})
export class TextFieldDemo extends AbstractDemoComponent {

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public onBlur(event: FocusEvent) {
    console.log('blur', event);
  }

  public onFocus(event: FocusEvent) {
    console.log('focus', event);
  }
}
