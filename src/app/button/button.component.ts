import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'button-demo',
  templateUrl: 'button.component.html'
})
export class ButtonDemo {
  public buttonType = 'raised';
  public doRipple = false;
  public colored = '';
  public btnDisabled = false;
}
