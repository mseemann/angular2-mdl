import { Component } from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';

@Component({
  moduleId: module.id,
  selector: 'loading-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'loading.component.html'
})
export class LoadingDemo {
  public progress = 44;
  public indeterminate = true;
  public buffer = 78;
  public active = true;
}
