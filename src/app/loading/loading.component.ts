import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'loading-demo',
  templateUrl: 'loading.component.html'
})
export class LoadingDemo {
  public progress = 44;
  public indeterminate = true;
  public buffer = 78;
  public active = true;
}
