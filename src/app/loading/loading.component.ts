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
  progress = 44;
  indeterminate = true;
  buffer = 78;
  active = true;
}
