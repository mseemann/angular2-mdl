import { Component } from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';

@Component({
  moduleId: module.id,
  selector: 'button-demo',
  host: {
    '[@flyInOut]': 'true',
    '[style.display]': "'block'"
  },
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'button.component.html'
})
export class ButtonDemo {
  public buttonType = 'raised';
  public doRipple = false;
  public colored = '';
  public btnDisabled = false;
}
