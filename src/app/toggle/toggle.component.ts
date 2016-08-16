import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'toggle-demo',
  templateUrl: 'toggle.component.html'
})
export class ToggleDemo {
  protected checkbox1 = true;
  protected checkbox2 = false;

  protected radioOption = '1';
}
