import { Component } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'button-demo',
  templateUrl: 'button.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
})
export class ButtonDemo {
  public buttonType = 'raised';
  public doRipple = false;
}
