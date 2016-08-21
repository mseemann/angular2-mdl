import { Component } from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';

@Component({
  moduleId: module.id,
  selector: 'toggle-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'toggle.component.html'
})
export class ToggleDemo {
  protected checkbox1 = true;
  protected checkbox2 = false;

  protected radioOption = '1';
}
