import { Component } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'loading-demo',
  templateUrl: 'loading.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
})
export class LoadingDemo {
  public progress = 44;
  public indeterminate = true;
  public buffer = 78;
  public active = true;
}
