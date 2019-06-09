import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {flyInOutTrigger, hostConfig} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';
import {MdlTextFieldComponent} from '@angular-mdl/core';


@Component({
  selector: 'textfield-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'textfield.component.html'
})
export class TextFieldDemo extends AbstractDemoComponent implements AfterViewInit {

  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  @ViewChild('theFirstTextfield', {static: true}) tf: MdlTextFieldComponent;

  public number1: number = null;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  get valueType() {
    return typeof this.number1;
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

  public ngAfterViewInit() {
    this.tf.setFocus();
  }
}
