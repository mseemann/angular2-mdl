import { Component, AfterViewInit, ContentChild, ViewChild } from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';
import { MdlTextFieldComponent } from '../../../lib/components/textfield/mdl-textfield.component';


@Component({
  selector: 'textfield-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'textfield.component.html'
})
export class TextFieldDemo extends AbstractDemoComponent implements AfterViewInit {

  @ViewChild('theFirstTextfield') tf: MdlTextFieldComponent;

  public number1: number = null;

  get valueType() {
    return typeof this.number1;
  }

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public onBlur(event: FocusEvent) {
    console.log('blur', event);
  }

  public onFocus(event: FocusEvent) {
    console.log('focus', event);
  }

  public onKeyup(event: KeyboardEvent) {
    console.log('keyup', event);
  }

  public ngAfterViewInit(){
    this.tf.setFocus();
  }
}
